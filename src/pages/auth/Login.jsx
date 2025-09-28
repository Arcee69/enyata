import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CgSpinner } from 'react-icons/cg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const formValidationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number')
            .required('Password is required'),
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const navigate = useNavigate();

    const submitForm = (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/overview');
        }, 3000); 
    };

    return (
        <div className="w-[467px] border mx-auto border-[#A4A7B74D] rounded-lg h-auto px-[66px] pt-[36px] pb-[38px] bg-white">
            <div className="flex flex-col gap-2">
                <p className="font-inter font-semibold text-2xl text-NEUTRAL-100 leading-8">Login</p>
                <p className="font-inter text-base text-NEUTRAL-200 leading-6">Kindly enter your details to log in</p>
            </div>

            <div className="mt-[62px]">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={formValidationSchema}
                    onSubmit={submitForm}
                >
                    {({ handleSubmit, handleChange, isValid, errors, touched, values }) => (
                        <Form onSubmit={handleSubmit} className="flex justify-center">
                            <div className="flex flex-col w-[335px] gap-8">
                                <div className="flex flex-col w-full relative">
                                    <label className='absolute font-inter font-medium text-NEUTRAL-400 text-xs left-2 z-10 bg-white px-1 -top-2 '>Email Address</label>
                                    <input
                                        name="email"
                                        placeholder="Your Email"
                                        type="text"
                                        value={values.email}
                                        onChange={handleChange}
                                        className="outline-BLUE-100 bg-white w-full text-NEUTRAL-300 font-inter text-sm rounded-sm border border-NEUTRAL-900 px-3 py-2 h-[48px] border-solid"
                                    />
                                    {errors.email && touched.email && (
                                        <div className="text-red-500 text-xs">{errors.email}</div>
                                    )}
                                </div>

                                <div style={{ minHeight: '48px' }}>
                                    <div className="flex flex-col w-full">
                                        <div className="relative">
                                            <label className='absolute font-inter font-medium text-NEUTRAL-400 text-xs left-2 z-10 bg-white px-1 -top-2 '>Password</label>
                                            <input
                                                name="password"
                                                placeholder="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleChange}
                                                className="outline-BLUE-100 bg-white w-full text-NEUTRAL-300 font-inter text-sm rounded-sm border border-NEUTRAL-900 px-3 py-2 h-[48px] border-solid"
                                            />
                                            {showPassword ? (
                                                <BsEyeSlash
                                                    className="absolute top-[14px] right-4 text-[20px] lg:right-3 cursor-pointer text-[#AEAEB2]"
                                                    onClick={togglePasswordVisibility}
                                                />
                                            ) : (
                                                <BsEye
                                                    className="absolute top-[14px] text-[20px] right-4 lg:right-3 cursor-pointer text-[#AEAEB2]"
                                                    onClick={togglePasswordVisibility}
                                                />
                                            )}
                                        </div>
                                        {errors.password && touched.password && (
                                            <div className="text-red-500 text-xs">{errors.password}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-6">
                                    <button
                                        className={`${isValid ? 'bg-[#2D84FF]' : 'bg-[#BABABA]'} w-full font-poppins flex items-center cursor-pointer rounded-[6px] justify-center h-[48px] text-base text-center`}
                                        type="submit"
                                        // disabled={!isValid || loading}
                                    >
                                        {loading ? (
                                            <CgSpinner className="animate-spin text-lg text-white" />
                                        ) : (
                                            <span className="text-white text-base font-inter font-medium">Log In</span>
                                        )}
                                    </button>

                                    <p className="underline cursor-pointer text-BLUE-100 font-inter text-sm">Forgot your password?</p>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="flex items-center justify-center mt-[96px]">
                    <p className="text-NEUTRAL-100 leading-5 font-inter text-xs">
                        <span className="cursor-pointer underline">Privacy Policy</span>
                        <span className="no-underline text-NEUTRAL-400 mx-0.5">and</span>
                        <span className="cursor-pointer underline">Terms of services</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;