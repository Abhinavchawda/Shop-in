const express = require("express");
const server = express();
const cors = require('cors')

require('dotenv').config();

const port = process.env.PORT;

const { User } = require("./model/User");

//passport js authentification
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const productsRouter = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");

const crypto = require('crypto')

//Jwt
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Jwt optionsconst 
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY';

//json web tokens
const SECRET_KEY = 'SECRET_KEY';
const token = jwt.sign({ foo: 'bar' }, SECRET_KEY);

//middlewares 

server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate('session'));


server.use(cors({
  exposedHeaders: ['X-Total-Count']
}))

server.use(express.json()); // to parse req.body


server.use('/brands', brandsRouter.router);
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/users', usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart', cartRouter.router);
server.use('/orders', ordersRouter.router);


//passport strategies
passport.use('local', new LocalStrategy(
  {usernameField: "email"},
  async function (email, password, done) {
    //by default passport uses 'username'
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        return done(null, false, { message: "Login failed : invalid credentials" })
      }

      //algo for encryption
      crypto.pbkdf2(
        password,
        user.salt,
        31000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          // TODO : this is a temporary method for login we will make a strong secure login method
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Login failed : invalid credentials" })
          }

          done(null, { id: user.id, name: user.name, email: user.email, addresses: user.addresses })
        }
      )
    }
    catch (error) {
      done(error)
    }
  }
));

// passport.use('jwt', new JwtStrategy(opts,
//   async function (jwt_payload, done) {
//     //by default passport uses 'username'
//     const user = await User.findOne({ id: jwt_payload.sub },
//       function (err, user) {
//         if (!user) {
//           return done(null, false, { message: "Login failed : invalid credentials" })
//         }

//         crypto.pbkdf2(
//           password,
//           user.salt,
//           31000,
//           32,
//           'sha256',
//           async function (err, hashedPassword) {
//             // TODO : this is a temporary method for login we will make a strong secure login method
//             if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
//               return done(null, false, { message: "Login failed : invalid credentials" })
//             }
//             // { id: user.id, name: user.name, email: user.email, addresses: user.addresses }
//             const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY)
//             done(null, token)
//           }
//         )
//       }
//     )
//   }
// ));

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});


main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  await mongoose.connect(process.env.MONGODB_URL);
}

server.get('/', (req, res) => {
  res.json({ status: true });
})

server.listen(port, () => {
  console.log(`started on ${port}`);
})