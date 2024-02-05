async function generateKey() {
	return crypto.subtle.generateKey(
		{
			name: 'AES-CBC',
			length: 256,
		},
		true,
		['encrypt', 'decrypt'],
	);
}

export async function encryptPassword(password: string) {
	const enc = new TextEncoder();
	const encoded = enc.encode(password);

	// Generate a new key
	const key = await generateKey();

	// iv will be needed for decryption
	const iv = crypto.getRandomValues(new Uint8Array(16));

	// Encrypt the password
	const encryptedPassword = await crypto.subtle.encrypt(
		{
			name: 'AES-CBC',
			iv: iv,
		},
		key as CryptoKey,
		encoded,
	);

	// Return the encrypted password along with key and iv
	return {
		encryptedPassword,
		key,
		iv,
	};
}

export async function verifyPassword(
	encryptedPassword: ArrayBuffer,
	plaintextPassword: string,
): Promise<boolean> {
	const enc = new TextEncoder();
	const encodedPlaintext = enc.encode(plaintextPassword);

	// Retrieve the key and iv from the encryption parameters
	const { key, iv } = (await encryptPassword('dummyPassword'))
		.encryptedPassword;

	// Decrypt the encrypted password
	const decryptedPassword = await crypto.subtle.decrypt(
		{
			name: 'AES-CBC',
			iv: iv,
		},
		key,
		encryptedPassword,
	);

	// Compare the decrypted password with the encoded plaintext
	const decryptedText = new TextDecoder().decode(decryptedPassword);
	const plaintext = new TextDecoder().decode(encodedPlaintext);

	// Return true if the decrypted password matches the plaintext password, else return false
	return decryptedText === plaintext;
}
