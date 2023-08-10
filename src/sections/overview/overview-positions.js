import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const fillColor = (profitability) => profitability > 0
  ? 'success'
  : 'error'

export const OverviewPositions = (props) => {
  const { positions = [], sx, selectedCategory } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Posições" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Código
                </TableCell>
                <TableCell>
                  Categoria
                </TableCell>
                <TableCell sortDirection="desc">
                  Quantidade
                </TableCell>
                <TableCell>
                  Valor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positions
                .filter((position) => selectedCategory === '' || position.category === selectedCategory)
                .map((position) => {
                  return (
                    <TableRow
                      hover
                      key={position.itemName}
                    >
                      <TableCell>
                        {position.itemName}
                      </TableCell>
                      <TableCell>
                        {position.category}
                      </TableCell>
                      <TableCell>
                        {position.quantity}
                      </TableCell>
                      <TableCell sx={{ display: 'flex', justifyContent: 'space-around'}}>
                        R$ {position.quantity * position.price}
                        <SeverityPill color={fillColor(position.profitability)}>
                          {position.profitability}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewPositions.prototype = {
  positions: PropTypes.array,
  sx: PropTypes.object
};
