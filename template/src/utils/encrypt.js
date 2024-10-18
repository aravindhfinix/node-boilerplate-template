import crypto from 'crypto';
import { Session } from '../modules/v1/admin/models/session-model';

const ENCRYPTION_KEY = process.env.SC_ENCRYPTION_KEY || 'agdjhjdhfjdjshkjgfghnbjkggnhhnbv'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text, encryptionKey = ENCRYPTION_KEY) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return iv.toString('hex') + ':' + encrypted + ':' + tag;
}

export function decrypt(text, encryptionKey = ENCRYPTION_KEY) {
  try {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const tag = Buffer.from(parts.pop(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error("Error in decrypt:", error.message);
    throw new Error('Decryption failed');
  }
}


export const createSession = async (user, device) => {
  try {
    const tokenParams = {
      id: user._id,
      email: user.email,
      number: user.phone_number,
      name: user.name,
      time: new Date().valueOf()
    };

    if (device) {
      tokenParams.device_information = device;
    }

    await checkSession(user._id);

    const sessionParam = {
      session_token: encrypt(JSON.stringify(tokenParams)),
      user_id: user._id,
    };

    const session = await new Session(sessionParam).save();

    return session;
  } catch (error) {
    throw error.message;
  }
};


/**
 * Log out a session
 * @param {string} session - The session token to be logged out
 * @returns {Promise<error | session>}
 */
export const logoutSession = async (session) => {
  try {
    session = session.split(' ');
    const deletedSession = await Session.findOneAndDelete({ session_token: session });
    return deletedSession;
  } catch (error) {
    throw error.message;
  }
};


/**
 * Check user session and delete sessions if there are more than 50
 * @param {string} id - The user's ID to check sessions for
 * @returns {Promise<string | Error>} A success message or an error
 */
export const checkSession = async (id) => {
  try {
    const result = await Session.find({ user_id: id });

    if (result.length > 50) {
      await Session.deleteMany({ user_id: id });
    }

    return 'success';
  } catch (error) {
    console.error(err)
    throw error.message;
  }
};
