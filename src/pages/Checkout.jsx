import
{
    FormControl,
    FormLabel,
    Input,
    Container,
    Text,
    Center,
    Flex,
    Button,
    Checkbox
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GooglePay from '../components/googlePay';

const Checkout = () =>
{
    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [AddressLine, setAddressLine] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isCheckoutEnabled, setIsCheckoutEnabled] = useState(false);
    const [displayPaymentMethod, setDisplayPaymentMethod] = useState(false);
    const [shippingDetails, setShippingDetails] = useState(null);

    useEffect(() =>
    {
        if (firstName && lastName && emailAddress && AddressLine && city && state && postCode && country && phoneNumber) {
            setIsCheckoutEnabled(true);
        } else {
            setIsCheckoutEnabled(false);
            setDisplayPaymentMethod(false);
            setShippingDetails(null);
        }
    }, [firstName, lastName, emailAddress, AddressLine, city, state, postCode, country, phoneNumber]);


    const onCheckout = () =>
    {
        if (isCheckoutEnabled) {
            setDisplayPaymentMethod(true);

            const shippingDetails = {
                first_name: firstName,
                last_name: lastName,
                email: emailAddress,
                address_line_1: AddressLine,
                city,
                state,
                postal_code: postCode,
                country,
                phone: phoneNumber
            }

            setShippingDetails(shippingDetails);
        }
    }

    const onSuccessPay = () =>
    {
        history.replace('/success');
    }

    const onBackToProducts = () =>
    {
        history.goBack();
    }

    return (
        <Flex>
            <Container maxW='md' bg='Alphas' color='white' mt={2} borderRadius="md">
                <Flex flexDirection='column'>
                    <Center h='100px' color='white'>
                        <Text fontSize="4xl" color='teal'>Checkout</Text>
                    </Center>
                    <Text fontSize='md' color='teal.900'>Please enter shipping details</Text>
                </Flex>
                <FormControl>
                    <FormLabel htmlFor='firstname' color='teal'>First Name</FormLabel>
                    <Input id='firstname' type='text' color='black' onChange={(e) => setFirstName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='lastname' color='teal'>Last Name</FormLabel>
                    <Input id='lastname' type='text' color='black' onChange={(e) => setLastName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='email' color='teal'>Email address</FormLabel>
                    <Input id='email' type='email' color='black' onChange={(e) => setEmailAddress(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='addressline1' color='teal'>Address Line 1</FormLabel>
                    <Input id='addressline1' type='text' color='black' onChange={(e) => setAddressLine(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='city' color='teal'>City</FormLabel>
                    <Input id='city' type='text' color='black' onChange={(e) => setCity(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='state' color='teal'>State</FormLabel>
                    <Input id='state' type='text' color='black' onChange={(e) => setState(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='postalcode' color='teal'>Postal Code</FormLabel>
                    <Input id='postalcode' type='text' color='black' onChange={(e) => setPostalCode(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='country' color='teal'>Country</FormLabel>
                    <Input id='country' type='text' color='black' onChange={(e) => setCountry(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='phonenumber' color='teal'>Phone Number</FormLabel>
                    <Input id='phonenumber' type='text' color='black' onChange={(e) => setPhoneNumber(e.target.value)} />
                </FormControl>
                <Checkbox isDisabled defaultChecked>
                    <Text fontSize='md' color='teal.900'>
                        Is shipping address same as billing address
                    </Text>
                </Checkbox>
                <Button colorScheme='teal' size='md' mt='2' isFullWidth={true} isDisabled={!isCheckoutEnabled} onClick={onCheckout}>
                    Checkout
                </Button>
                <Button colorScheme='teal' size='md' mt='2' isFullWidth={true} onClick={onBackToProducts}>
                    Back to products
                </Button>
            </Container>
            {displayPaymentMethod && <Container maxW='md' bg='Alphas' color='white' mt={2} borderRadius="md">
                <Flex flexDirection='column'>
                    <Center h='100px' color='white'>
                        <Text fontSize="4xl" color='teal'>Make Payment</Text>
                    </Center>
                    <Text fontSize='md' color='teal.900' mb='10'>Select payment method</Text>
                </Flex>
                <GooglePay shippingDetails={shippingDetails} onSuccessPay={onSuccessPay} />
            </Container>}
        </Flex>
    )
}

export default Checkout;