import { Suspense, lazy } from "react";
import { Banner } from "../components/banner/Banner";

type HomePageProps = {};

const CoinTable = lazy(() =>
    import("../components/CoinTable").then(({ CoinTable }) => ({
        default: CoinTable,
    }))
);

export const HomePage = (props: HomePageProps) => {
    return (
        <div>
            <Banner />

            <Suspense fallback={<div>Loading...</div>}>
                <CoinTable />
            </Suspense>
        </div>
    );
};
