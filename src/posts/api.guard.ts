import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as Crypto from 'node-crypt'
const crypto = new Crypto({
    key: 'b95d8cb128734ff8821ea634dc34334535afe438524a782152d11a5248e71b01',
    hmacKey: 'dcf8cd2a90b1856c74a9f914abbb5f467c38252b611b138d8eedbe2abb4434fc'
    // key : String(process.env.CROPTO_KEY),
    // hmacKey : String(process.env.CROPTO_HMAC_KEY)
});


@Injectable()
export class ApiGuard implements CanActivate{

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(!bearer || !token){
                throw new UnauthorizedException({message : "unauthorized"})
            }
            // const decrypted = crypto.decrypt(token)
            
            if(token == process.env.PRIVATE_KEY){
                return true
            } else {
                throw new UnauthorizedException({message : "unauthorized"})
            }
        } catch (e) {
            throw new UnauthorizedException({message : "unauthorized"})
        }
    }
}