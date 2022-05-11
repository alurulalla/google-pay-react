import { Container, Button } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Success = () =>
{
    const history = useHistory();

    const onBack = () =>
    {
        history.replace('/');
    }
    return (
        <>

            <Container display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                <CheckCircleIcon boxSize={10} color='teal' m='5' />Payment was successful.
                <Button m='5' onClick={onBack}>Back to products</Button>
            </Container>
        </>
    )
}

export default Success;