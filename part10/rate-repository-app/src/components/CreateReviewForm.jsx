import { Pressable, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview.js';

const validationScheme = yup.object().shape({
    ownerName: yup.string().required('Owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number().required('Rating is required').min(0, 'Rating must be at least 0').max(100, 'Rating must be at most 100'),
    text: yup.string()
})

const CreateReviewForm = () => {
    const [ createReview ] = useCreateReview();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            ownerName: '',
            repositoryName: '',
            rating: '',
            text: ''
        },
        validationSchema: validationScheme,
        onSubmit: values => handleCreateReview(values)
    });

    const handleCreateReview = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;

        try {
            const response = await createReview({ ownerName, repositoryName, rating, text });

            if (response) {
                console.log('Create review successful', response);
                navigate('/repository/' + response.data.createReview.repository.id);
            }
        }
        catch (error) {
            console.log(error);
        }
    };


    return (
        <View style={{ padding: 15 }}>
    
            <TextInput
                placeholder="Owner Name"
                onChangeText={formik.handleChange('ownerName')}
                value={formik.values.ownerName}
                style={{
                    borderColor: formik.touched.ownerName && formik.errors.ownerName ? 'red' : theme.colors.textSecondary,
                    borderWidth: 1, marginBottom: 5, borderRadius: 4
                }}
            />
            { formik.touched.ownerName && formik.errors.ownerName &&
                <Text style={{ color: 'red', marginBottom: 15 }}>{formik.errors.ownerName}</Text>
            }

            <TextInput
                placeholder="Repository Name"
                onChangeText={formik.handleChange('repositoryName')}
                value={formik.values.repositoryName}
                style={{
                    borderColor: formik.touched.repositoryName && formik.errors.repositoryName ? 'red' : theme.colors.textSecondary,
                    borderWidth: 1, marginBottom: 5, borderRadius: 4
                }}
            />
            { formik.touched.repositoryName && formik.errors.repositoryName &&
                <Text style={{ color: 'red', marginBottom: 15 }}>{formik.errors.repositoryName}</Text>
            }

            <TextInput
                placeholder="Rating between 0 and 100"
                onChangeText={formik.handleChange('rating')}
                value={formik.values.rating}
                keyboardType="numeric"
                style={{
                    borderColor: formik.touched.rating && formik.errors.rating ? 'red' : theme.colors.textSecondary,
                    borderWidth: 1, marginBottom: 5, borderRadius: 4
                }}
            />
            { formik.touched.rating && formik.errors.rating &&
                <Text style={{ color: 'red', marginBottom: 15 }}>{formik.errors.rating}</Text>
            }

            <TextInput
                placeholder="Review"
                onChangeText={formik.handleChange('text')}
                value={formik.values.text}
                multiline
                style={{
                    borderColor: formik.touched.text && formik.errors.text ? 'red' : theme.colors.textSecondary,
                    borderWidth: 1, marginBottom: 5, borderRadius: 4, height: 100, textAlignVertical: 'top'
                }}
            />
            { formik.touched.text && formik.errors.text &&
                <Text style={{ color: 'red', marginBottom: 15 }}>{formik.errors.text}</Text>
            }
            
            <Pressable onPress={formik.handleSubmit}>
                <View style={{ backgroundColor: theme.colors.primaryButtonBackgroundColor, padding: 10, borderRadius: 4, marginTop: 10 }}>
                <Text fontWeight={"bold"} style={{ color: 'white', alignSelf: 'center' }}>Submit Review</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default CreateReviewForm;
