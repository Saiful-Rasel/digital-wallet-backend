import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envVariable } from "./env";
import { User } from "../module/user/user.model";
import { UserRole } from "../module/user/user.interface";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVariable.GOOGLE_CLIENT,
      clientSecret: envVariable.GOOLE_SECRET,
      callbackURL: envVariable.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "email not found" });
        }
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: UserRole.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, user); 
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
