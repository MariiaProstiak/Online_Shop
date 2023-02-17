import { Card } from "../components/Card";
import { AppContext } from "../store/app-context";
import { useContext, useEffect, useState } from "react";
import { PageWrapper } from "../components/ui/PageWrapper";
import Spinner from "../components/ui/Spinner";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom";

export const Favorites = () => {
  const ctx = useContext(AppContext);
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <PageWrapper title="My Favorites">
        <Spinner />
      </PageWrapper>
    );
  }

  if (!authCtx.currentUser) {
    return (
      <PageWrapper title="My Favorites">
        <p>
          The list of your favorites is empty.
          <Link
            to="/auth"
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Please log in to your account
          </Link>
        </p>
      </PageWrapper>
    );
  }
  if (ctx.favorites.length === 0 && !isLoading) {
    return (
      <PageWrapper title="My Favorites">
        <p>The list of your favorites is empty.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="My Favorites">
      {ctx.favorites.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </PageWrapper>
  );
};
