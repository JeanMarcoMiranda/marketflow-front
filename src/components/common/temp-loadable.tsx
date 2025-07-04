/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { FullScreenLoader } from "./full-screen-loader";

export const Loadable =
  (Component: React.LazyExoticComponent<React.ComponentType<any>>) =>
  (props: any) =>
    (
      <Suspense fallback={<FullScreenLoader />}>
        <Component {...props} />
      </Suspense>
    );
