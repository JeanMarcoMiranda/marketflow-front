/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { FullScreenLoader } from "./FullScreenLoader";

export const Loadable =
  (Component: React.LazyExoticComponent<React.ComponentType<any>>) =>
  (props: any) =>
    (
      <Suspense fallback={<FullScreenLoader />}>
        <Component {...props} />
      </Suspense>
    );
