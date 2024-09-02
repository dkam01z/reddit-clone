import { Flex, Text, Button} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterCommunityByName } from "../slice/CommunitySlice";



const CommunityHome = () => {
    const { selectedCommunity, loading, error } = useSelector((state) => state.community);
    const {communityName} = useParams();
    const dispatch = useDispatch();

   

    useEffect(() => {
        try {
            dispatch(filterCommunityByName(communityName))
        } catch (error) {
            console.log("Error: ", error)
        }
    }, [dispatch, communityName])

    
    if (!selectedCommunity) {

         return (
            <Flex height="60vh" direction="column" justifyContent="center" align="center">
              <Text my={2} fontSize="xl">Sorry, that community does not exist or has been banned. </Text>
              <Button borderRadius="50px" color="gray.200" backgroundColor="reddit.100">Go Home</Button>
            </Flex>
         )
    }


}



export default CommunityHome;