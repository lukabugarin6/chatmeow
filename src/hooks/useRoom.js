import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { db } from "../firebase"

export const useRoom = (workspaceId, roomId) => {
    const [workspaceRooms] = useCollection(
        workspaceId && db.collection('workspaces').doc(workspaceId).collection('rooms')
    )

    const [workspaceRoomDetails] = useDocument(
        workspaceId && roomId && db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId)
    )

    const createRoomForWorkspace = async (id, roomName) => {
        const createdRoom = await db.collection('workspaces').doc(id).collection('rooms').add({
            name: roomName
        })

        return createdRoom;
    }

    return {
        createRoomForWorkspace,
        workspaceRooms,
        workspaceRoomDetails,
    }
}