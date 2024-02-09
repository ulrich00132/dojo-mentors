import React from "react";
import SubscriptionElements from "../components/subscription/SubscriptionElements";
import Container from "../components/Container";

const confirmSubscriptionPage = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20">
        <SubscriptionElements />
      </div>
    </Container>
  );
};

export default confirmSubscriptionPage;
