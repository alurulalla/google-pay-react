import { Box, Image, Badge, Center, Text, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons'
import InternetImage from '../image/internet.jpg';
import { useHistory } from 'react-router-dom';

const Home = () =>
{
    const history = useHistory();
    const property = {
        imageUrl: '../../public/internet.jpg',
        imageAlt: 'A new internet connection',
        speed: '1000 mbps',
        title: 'A new internet connection',
        formattedPrice: '$79.00',
        reviewCount: 34,
        rating: 4,
    }

    const onBuyNow = () =>
    {
        history.push('/checkout');
    }

    return (
        <>
            <Center h='100vh' display='flex' alignItems='center' flexDirection='column'>
                <Text fontSize='5xl'>Packages</Text>
                <Box mt='3' maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Image src={InternetImage} alt={property.imageAlt} />

                    <Box p='6'>
                        <Box display='flex' alignItems='baseline'>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                New
                            </Badge>
                            <Box
                                color='gray.500'
                                fontWeight='semibold'
                                letterSpacing='wide'
                                fontSize='xs'
                                textTransform='uppercase'
                                ml='2'
                            >
                                {property.speed} speed &bull; unlimited download
                            </Box>
                        </Box>

                        <Box
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                            lineHeight='tight'
                            isTruncated
                        >
                            {property.title}
                        </Box>

                        <Box>
                            {property.formattedPrice}
                            <Box as='span' color='gray.600' fontSize='sm'>
                                / month
                            </Box>
                        </Box>

                        <Box display='flex' mt='2' alignItems='center'>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < property.rating ? 'teal.500' : 'gray.300'}
                                    />
                                ))}
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                {property.reviewCount} reviews
                            </Box>
                        </Box>
                        <Button mt='5' bg='teal' isFullWidth='true' onClick={onBuyNow}>Buy Now</Button>
                    </Box>
                </Box>
            </Center>
        </>

    )
}

export default Home;