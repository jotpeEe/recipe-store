import { Card, CardList, Categories, SectionTitle } from '@components';
import { SectionLayout as Layout } from '@layouts';

const Recipes: React.FC = () => (
    <Layout>
        <div className="grid grid-cols-1to2 gap-20 py-28">
            <SectionTitle
                subtitle="Recipes"
                title="The home store for all your recipes"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat."
                button
            />
            <div>
                <Categories />
                <CardList wrap>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </CardList>
            </div>
        </div>
    </Layout>
);

export default Recipes;
