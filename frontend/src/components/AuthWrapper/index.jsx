import React from "react";
import { useAuth } from "@arcana/auth-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

function AuthWrapper({ onLoginNavigateTo, children }) {
  const auth = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const login = async () => {
      if (auth.loading) return;
      if (auth.isLoggedIn && auth?.user) {
        setLoading(false);
        navigate(onLoginNavigateTo);

        const { user } = auth || {};
        const q = query(
          collection(db, "users"),
          where("address", "==", user.address)
        );
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
          await addDoc(collection(db, "users"), {
            address: user.address,
            name: user.name,
            authProvider: user.loginType,
            email: user.email,
            publicKey: user.publicKey,
            picture: user.picture,
          });
        }
      } else {
        navigate("/login");
      }
    };
    login();
  }, [auth, navigate, onLoginNavigateTo]);

  if (loading) return <>Loading...</>;
  return <>{children}</>;
}

export default AuthWrapper;
