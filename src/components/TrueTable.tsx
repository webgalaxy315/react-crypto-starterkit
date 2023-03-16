import Table from '@mui/material/Table';

const TrueTable = ({ children }) => {
    return (
        <Table
            sx={{
                '& td, & th': {
                    borderColor: 'divider',
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderLeft: 'none',
                    borderRight: 'none',
                    '&:nth-of-type(odd)': {
                        bgcolor: 'rgb(255 255 255 / 2.5%)'
                    }
                },
                '& tr': {
                    '&:nth-of-type(1)': {
                        '& td': {
                            borderTop: 'none'
                        }
                    },
                    '&:nth-last-of-type(1)': {
                        '& td': {
                            borderBottom: 'none'
                        }
                    }
                }
            }}
        >
            {children}
        </Table>
    );
};

export default TrueTable;
