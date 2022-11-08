import { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import SongCard from "./SongCard.js";
import MUIEditSongModal from "./MUIEditSongModal";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { GlobalStoreContext } from "../store/index.js";
import MUIAccountModal from "./MUIAccountModal.js";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { id } = useParams();
    const [loaded, setLoaded] = useState(true);

    store.history = useHistory();

    useEffect(() => {
        if (!store.currentList) {
            store.setCurrentList2(id).then((res) => {
                if (!res.data.success) {
                    console.log('fail load');
                    setLoaded(false);
                } else {
                    setLoaded(true);
                }
            });
            // store.history.push('/playlist/' + id);
            // return <div id='playlist-cards'></div>;
        }
    }, []);

    if (!store.currentList)
        if (!loaded) return <MUIAccountModal open={true} message={"Cannot open someone else's playlist"} handleClose={() => store.history.push('/')}/>
        else return '';

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    } else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    return (
        <Box sx={{ height: "80%" }}>
            <List
                id="playlist-cards"
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    height: "100%",
                    boxSizing: "border-box",
                    overflowY: "scroll",
                }}
            >
                {store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={"playlist-song-" + index}
                        key={"playlist-song-" + index}
                        index={index}
                        song={song}
                    />
                ))}
            </List>
            {modalJSX}
        </Box>
    );
}

export default WorkspaceScreen;
