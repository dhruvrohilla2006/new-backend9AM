import jwt from 'jsonwebtoken'

export function generateToken (data) {
   const token =  jwt.sign(
        {
            role:data?.role,
            id:data?._id
        },"79085ad729948a1a7acf19918230450dc5abb3284a794d4db05d36cca0b59cf1",
        {
            "expiresIn":"12h"
        }
    )


    return token;
}





