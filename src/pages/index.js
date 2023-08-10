import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CardKPI } from 'src/components/card-kpi';
import { OverviewPositions } from 'src/sections/overview/overview-positions';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewDistribution } from 'src/sections/overview/overview-distribution';
import { WalletConsumer } from 'src/contexts/wallet-context';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import BanknotesIcon  from '@heroicons/react/24/solid/BanknotesIcon';
import ArrowUpIcon  from '@heroicons/react/24/solid/ArrowUpOnSquareStackIcon';
import { blue } from '@mui/material/colors';
import { useWallet } from 'src/hooks/use-wallet';

const now = new Date();

const Page = () => {
  const wallet = useWallet();
  return (
    <>
      <Head>
        <title>
          Overview | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">        
          
            <WalletConsumer>
              {
                (walletData) => (
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      xs={12}
                      sm={6}
                      lg={3}
                    >
                      <CardKPI
                        title="Valor Atual"
                        difference={(((walletData.totalValue/walletData.totalInvestment) -1 ) * 100).toFixed(0)}
                        positive
                        positiveLegend="Rentabilidade"
                        icon={<CurrencyDollarIcon />}
                        iconBackground="success.main"
                        sx={{ height: '100%' }}
                        value={`R$ ${walletData.totalValue}`}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                      lg={3}
                    >
                      <CardKPI
                        title="Valor Investido"
                        icon={<CurrencyDollarIcon />}
                        iconBackground="error.main"
                        sx={{ height: '100%' }}
                        value={`R$ ${walletData.totalInvestment}`}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                      lg={3}
                    >
                      <CardKPI
                        title="Lucro Atual"
                        icon={<ArrowUpIcon />}
                        iconBackground="success.main"
                        sx={{ height: '100%' }}
                        value={`R$ ${walletData.totalValue - walletData.totalInvestment}`}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                      lg={3}
                    >
                      <CardKPI
                        title="Proventos"
                        icon={<BanknotesIcon />}
                        iconBackground={blue[500]}
                        sx={{ height: '100%' }}
                        value="R$ 61,89"
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                      lg={4}
                    >            
                      <OverviewDistribution
                        positionSeries={walletData.currentPositionCategories}
                        sx={{ height: '100%' }}
                        selectCategory={wallet.selectCategory}
                      />              
                    </Grid>
                    <Grid
                      xs={12}
                      lg={8}
                    >
                      <OverviewSales
                        chartSeries={[
                          {
                            name: 'This year',
                            data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                          },
                          {
                            name: 'Last year',
                            data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                          }
                        ]}
                        sx={{ height: '100%' }}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      md={12}
                      lg={12}
                    >
                      <OverviewPositions
                        positions={walletData.currentPositions.slice(0, 10)}
                        selectedCategory={walletData.selectedCategory}
                      />
                    </Grid>
                  </Grid>
                )
              }
            </WalletConsumer>       
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
