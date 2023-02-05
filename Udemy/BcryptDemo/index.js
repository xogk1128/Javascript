const bcrypt = require('bcrypt');
 
// const hashPassword = async (pwd) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(pwd, salt)
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async (pwd) => {
    const hash = await bcrypt.hash(pwd, 12);
    console.log(hash);
}

const login = async (pwd, hashedPwd) => {
    const result = await bcrypt.compare(pwd, hashedPwd);
    if(result){
        console.log("LOGED YO IN!");
    } else {
        console.log("INCORRECT!");
    }
}

//hashPassword('monkey');
// login('monkey', '$2b$10$Kfzb5ApjYavybea5nkFE8eRRgu6v4P8JISo5DYU2Ti5pSSYq9mIgy');

login('monkey', '$2b$12$f6XjkQYQJaoKRTq6f8NvTuTWJ7c5oz0t11JZohBoRmRYFDKE8xjka');