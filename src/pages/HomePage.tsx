import { CoinTable } from "../components/CoinTable";
import { Banner } from "../components/banner/Banner";

type HomePageProps = {};

export const HomePage = (props: HomePageProps) => {
    return (
        <>
            <Banner />
            <CoinTable />
        </>
    );
};
