#include <assert.h>
#include <stdio.h>
#include <string.h>
#include <stdint.h>

#include "rfc7539.h"

#define TEXT_MAX_LENGTH 1023u - 16u
#define DECRYPT '0'
typedef struct
{
    union {
        uint8_t data_len_arr[2]; // fix: struct aligment
        uint16_t data_len : 10;
    };
    uint8_t tag[16];
    uint8_t text[TEXT_MAX_LENGTH];
} __attribute__((__packed__)) data_frame_t;

typedef struct
{
    uint8_t actual_tag[16];
    union {
        uint8_t data_len_arr[2]; // fix: struct aligment
        uint16_t data_len : 10;
    };
    uint8_t ciphertext[TEXT_MAX_LENGTH];
} __attribute__((__packed__)) data_out_t;

void hexStrToU8Array(char *hexStr, char *byteArr, size_t size);

int main(int argc, char **argv)
{

    uint8_t aad[12], key[32], nonce[12];
    data_frame_t dataFrame;
    hexStrToU8Array(argv[2], aad, sizeof(aad));
    hexStrToU8Array(argv[3], key, sizeof(key));
    hexStrToU8Array(argv[4], nonce, sizeof(nonce));
    hexStrToU8Array(argv[5], dataFrame.data_len_arr, sizeof(dataFrame.data_len_arr)); // data len
    hexStrToU8Array(argv[5], dataFrame.data_len_arr, dataFrame.data_len + sizeof(dataFrame.data_len_arr)); // tag + data

    dataFrame.data_len -= 16; // sub tagsize

    data_out_t dataOut = {.data_len = dataFrame.data_len, };

    chacha20poly1305_ctx ctx;
    rfc7539_init(&ctx, key, nonce);
    rfc7539_auth(&ctx, aad, sizeof(aad));

    if (argv[1][0] == DECRYPT)
        chacha20poly1305_decrypt(&ctx, dataFrame.text, dataOut.ciphertext, dataFrame.data_len);
    else
        chacha20poly1305_encrypt(&ctx, dataFrame.text, dataOut.ciphertext, dataFrame.data_len);

    rfc7539_finish(&ctx, sizeof(aad), dataFrame.data_len, dataOut.actual_tag);

    for (size_t i = 0; i < dataFrame.data_len + sizeof(dataOut.actual_tag) + 2; i++)
        printf("%02X", dataOut.actual_tag[i]);

    return 0;
}

void hexStrToU8Array(char *hexStr, char *byteArr, size_t size)
{
    const char *pos = hexStr;
    for (size_t i = 0; i < size; i++)
    {
        sscanf(pos, "%2hhx", &byteArr[i]);
        pos += 2;
    }
}