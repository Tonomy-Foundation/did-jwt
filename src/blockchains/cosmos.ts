import { secp256k1 } from '@noble/curves/secp256k1'
import { bech32 } from 'bech32'
import { sha256, ripemd160 } from '../Digest'

export function publicKeyToAddress(publicKey: string, prefix: string): string {
  const publicKeyBuffer = secp256k1.ProjectivePoint.fromHex(publicKey).toRawBytes()
  const hash = ripemd160(sha256(publicKeyBuffer))
  const words = bech32.toWords(hash)
  return bech32.encode(prefix, words).replace(prefix, '')
}
