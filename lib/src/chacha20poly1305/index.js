/* eslint-disable array-bracket-spacing */
/* eslint-disable arrow-parens */
const cp = require('child_process');
const outfile = __dirname + '/c_files/Binary';
const executable = `${outfile}`;

const aad = Buffer.from([
  0xa8, 0x54, 0x2a, 0x95, 0x4a, 0xa5, 0xb6, 0x5b, 0x2d, 0x96, 0x4b, 0x25,
]);
const key = Buffer.from([
  0xe1, 0xf0, 0x78, 0x3c, 0x1e, 0xf, 0xe1, 0xf0, 0x78, 0x3c, 0x1e, 0xf, 0xe1,
  0xf0, 0x78, 0x3c, 0x1e, 0xf, 0xa6, 0x53, 0x29, 0x94, 0x4a, 0x25, 0x4c, 0x26,
  0x93, 0xc9, 0x64, 0x32, 0xbf, 0x5f,
]);
const nonce = Buffer.from([
  0x18, 0xc, 0x86, 0x43, 0x21, 0x90, 0x1c, 0xe, 0x7, 0x83, 0x41, 0x20,
]);

module.exports.CC20_P1305_Mode = { DECRYPT: '0', ENCRYPT: '1' };
/**
 *
 * @param {Uint8Array} dataFrame dataFrame
 * @param {string} mode mode
 */
module.exports.chacha20poly1305_run = async (dataFrame, mode) => {
  const hexString = Buffer.from(dataFrame).toString('hex');
  if (mode === '1') console.log('\t- ChaCha20-Poly1305 Encryption start');
  else console.log('\t- ChaCha20-Poly1305 Decryption start');
  const outputBuffer = await cp.execFileSync(
    executable,
    [
      mode,
      aad.toString('hex'),
      key.toString('hex'),
      nonce.toString('hex'),
      hexString,
    ],
    { encoding: 'ascii' }
  );

  const fullDataBuf = new Uint8Array(Buffer.from(outputBuffer, 'hex'));

  let offset = 0;

  console.log('\t\t- Set-up of Poly1305 one-time key:');
  const poly1305_OTK = fullDataBuf.slice(0, 0 + 64);
  await CC20P1305_printMatrix(poly1305_OTK, 3);
  offset += poly1305_OTK.length;

  const CC20State = fullDataBuf.slice(64, 64 + 64);
  offset += CC20State.length;
  if (mode === '1') {
    console.log('\t\t- ChaCha20 Encryption State:');
    await CC20P1305_printMatrix(CC20State, 3);
    console.log('\t\t- Poly1305 function execution for ciphertext.');
  } else {
    console.log('\t\t- Poly1305 function execution for ciphertext.');
    console.log('\t\t- ChaCha20 Decryption State:');
    await CC20P1305_printMatrix(CC20State, 3);
  }
  const hexDataBuf = fullDataBuf.slice(offset); // skip 4-byte size of time measure

  const tag = hexDataBuf.slice(0, 0 + 16),
    data = hexDataBuf.slice(16);
  console.log('\t\t- Poly1305 Tag:');
  await CC20P1305_printMatrix(tag, 3);
  console.log('\t- ChaCha20-Poly1305 process end');
  return [tag, data];
};

/**
 *
 * @param {Uint8Array} matrix matrix
 * @param {number} level level
 */
async function CC20P1305_printMatrix(matrix, level = 0) {
  const u32Matrix = new Uint32Array(matrix.buffer);
  const rowArr = Array.from({ length: u32Matrix.length / 4 }, (_, k) => k * 4);
  for await (const rowI of rowArr) {
    // print level
    console.log(
      '%s%s %s %s %s',
      '\t'.repeat(level),
      ('0000000' + u32Matrix[rowI].toString(16)).substr(-8),
      ('0000000' + u32Matrix[rowI + 1].toString(16)).substr(-8),
      ('0000000' + u32Matrix[rowI + 2].toString(16)).substr(-8),
      ('0000000' + u32Matrix[rowI + 3].toString(16)).substr(-8)
    );
  }
}
