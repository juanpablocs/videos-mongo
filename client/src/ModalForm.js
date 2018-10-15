import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import { API_VIDEO, API_EMBED } from './config';

const styles = theme => ({
    inputTwo: {
        display: 'flex'
    },
    fabProgress: {
        color: green[500],
    }
});

class ModalForm extends React.Component {
    state = {
        form_idimdb: '',
        form_title: '',
        form_links: '',
        loading: false
    };

    changeInput = (e) => {
        const target = e.currentTarget;
        this.setState({ ['form_' + target.id]: target.value });
    }

    handleSubmit = () => {
        this.setState({ loading: true });
        fetch(API_VIDEO, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idimdb: this.state['form_idimdb'],
                title: this.state.form_title,
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('json', json);
                
                this.fetchLinks = []
                this.state.form_links.split('\n').forEach(link=>{
                    this.fetchLinks.push(fetch(API_EMBED, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id_video: json.data.id,
                            embed_url: link,
                        })
                    }));
                });
                Promise.all(this.fetchLinks).then(res=>{
                    console.log(res);
                    this.setState({ loading: false });
                    this.props.handleClose();
                    this.props.updateList();
                });
            })
            .catch(e => {
                console.log('err', e);
                this.setState({ loading: false });
                this.props.handleClose();
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <div style={{ position: 'relative' }}>
                    <DialogTitle id="form-dialog-title">Agregar</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por cada Link que se agregue ponga un salto de linea de separación.
                            </DialogContentText>
                        <Grid container xs={12} spacing={8}>
                            <Grid item xs={4}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="idimdb"
                                    label="Id Imdb"
                                    type="text"
                                    fullWidth
                                    variant='outlined'
                                    onChange={this.changeInput}
                                    value={this.state['form_idimdb']}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    margin="dense"
                                    id="title"
                                    label="Titulo"
                                    type="text"
                                    fullWidth
                                    variant='outlined'
                                    onChange={this.changeInput}
                                    value={this.state.title}
                                />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} spacing={8}>
                            <TextField
                                margin="dense"
                                id="links"
                                label="Links"
                                type="text"
                                multiline
                                rowsMax="6"
                                rows="5"
                                fullWidth
                                variant='outlined'
                                onChange={this.changeInput}
                                value={this.state.links}
                            />
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancelar
                            </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Agregar
                            </Button>
                    </DialogActions>
                    {this.state.loading && (
                        <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(255,255,255,.5)' }}>
                            <CircularProgress size={24} className={classes.buttonProgress} />
                        </div>
                    )}
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ModalForm);