import { Pressable, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

const validationScheme = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationScheme,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <View style={{ padding: 15 }}>
      <TextInput
        placeholder="Username"
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        style={{
          borderColor: formik.touched.username && formik.errors.username ? 'red' : theme.colors.textSecondary,
          borderWidth: 1, marginBottom: 5, borderRadius: 4
        }}
      />
      { formik.touched.username && formik.errors.username &&
        <Text style={{ color: 'red', marginBottom: 15 }}>{formik.errors.username}</Text>
      }
      <TextInput
        placeholder="Password"
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        secureTextEntry
        style={{
          borderColor: formik.touched.password && formik.errors.password ? 'red' : theme.colors.textSecondary,
          borderWidth: 1, marginBottom: 5, borderRadius: 4
        }}
      />
      { formik.touched.password && formik.errors.password &&
        <Text style={{ color: 'red', marginBottom: 15 }}>{formik.errors.password}</Text>
      }
      <Pressable onPress={formik.handleSubmit}>
        <View style={{ backgroundColor: theme.colors.primaryButtonBackgroundColor, padding: 10, borderRadius: 4, marginTop: 10 }}>
          <Text fontWeight={"bold"} style={{ color: 'white', alignSelf: 'center' }}>Sign In</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SignIn;
