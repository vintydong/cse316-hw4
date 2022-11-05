import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function MUIAccountModal({ open, message, handleClose }) {
    return (
        <Modal open={open}>
            <Box sx={style}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {message}
                </Alert>

                <Box sx={{ mt: 2 }} textAlign="center">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleClose}
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
