import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { AppContext } from "../../context/AppContext";

function AuthWrapper({ children }) {
  const auth = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const login = async () => {
      if (auth.loading) return;
      const timeOut = setTimeout(async () => {
        if (auth.isLoggedIn && auth?.user) {
          setLoading(false);

          const { user } = auth || {};
          const q = query(
            collection(db, "users"),
            where("uid", "==", user.address)
          );
          const docs = await getDocs(q);
          if (docs.docs.length === 0) {
            await setDoc(doc(db, "users", user?.address), {
              uid: user.address,
              name: user.name,
              authProvider: user?.authProvider,
              email: user.email,
              publicKey: user.publicKey,
            });
          }
        }
      }, 1000);
    };
    login();
  }, [auth, navigate]);

  if (loading) return <>Loading...</>;
  return <>{children}</>;
}

export default AuthWrapper;
