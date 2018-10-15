import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        position: 'relative',
    },
    table: {
        minWidth: 500,
    },
    fab: {
        position: 'absolute',
        bottom: '-50px',
        right: theme.spacing.unit * 2,
    },
    menu:{
        fontSize: '13px',
        paddingTop: '7px',
        paddingBottom: '7px'
    }
});

class SimpleTable extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>Imdb</TableCell>
                            <TableCell>Titulo</TableCell>
                            <TableCell numeric>Total</TableCell>
                            <TableCell>Acción</TableCell>
    
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.items.map((item,i) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell numeric>{item.idimdb}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.title}
                                    </TableCell>
                                    <TableCell numeric>{item.embeds.length}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="More"
                                            aria-owns={this.state.anchorEl ? 'menu' : null}
                                            aria-haspopup="true"
                                            onClick={this.handleClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Menu
                    id="menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem className={classes.menu} onClick={this.handleClose}>Edit</MenuItem>
                    <MenuItem className={classes.menu} onClick={this.handleClose}>Preview</MenuItem>
                    <MenuItem className={classes.menu} onClick={this.handleClose}>Delete</MenuItem>
                </Menu>
            </Paper>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);