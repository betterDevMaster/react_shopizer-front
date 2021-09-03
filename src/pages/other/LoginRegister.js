import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Layout from "../../layouts/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useForm, Controller } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import WebService from "../../util/webService";
import constant from "../../util/constant";
import { setLocalData, getLocalData } from "../../util/helper";
import { setLoader } from "../../redux/actions/loaderActions";
import { setUser, getGender, getCountry, getState } from "../../redux/actions/userAction";
import { getCart } from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { multilanguage } from "redux-multilanguage";

const loginForm = {
    username: {
        name: "username",
        validate: {
            required: {
                value: true,
                message: "Email is required",
            },
            pattern: {
                value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                message: "Please entered the valid email id",
            },
        },
    },
    loginPassword: {
        name: "loginPassword",
        validate: {
            required: {
                value: true,
                message: "Password is required",
            },
        },
    },
};
const registerForm = {
    email: {
        name: "email",
        validate: {
            required: {
                value: true,
                message: "Email is required",
            },
            pattern: {
                value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                message: "Please entered the valid email id",
            },
        },
    },
    password: {
        name: "password",
        validate: {
            required: {
                value: true,
                message: "Password is required",
            },

            validate: {
                hasSpecialChar: (value) =>
                    (value && value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)) ||
                    "Password must be minimum of 8 characters atleast one number and one special character",
            },
        },
    },
    repeatPassword: {
        name: "repeatPassword",
        validate: {
            required: {
                value: true,
                message: "Repeat Password is required",
            },
        },
    },
    firstName: {
        name: "firstName",
        validate: {
            required: {
                value: true,
                message: "Firstname is required",
            },
        },
    },
    lastName: {
        name: "lastName",
        validate: {
            required: {
                value: true,
                message: "Lastname is required",
            },
        },
    },
    gender: {
        name: "gender",
        validate: {
            required: {
                value: true,
                message: "Gender is required",
            },
        },
    },
    country: {
        name: "country",
        validate: {
            required: {
                value: true,
                message: "Country is required",
            },
        },
    },
    stateProvince: {
        name: "stateProvince",
        validate: {
            required: {
                value: true,
                message: "State is required",
            },
        },
    },
    postalCode: {
        name: "postalCode",
        validate: {
            required: {
                value: true,
                message: "Postal Code is required",
            },
        },
    },
};
const LoginRegister = ({
    merchant,
    strings,
    location,
    setLoader,
    setUser,
    getCart,
    getGender,
    getCountry,
    getState,
    genderData,
    countryData,
    currentLocation,
    stateData,
    cartItems,
    currentLanguageCode,
}) => {
    const { pathname } = location;
    const { addToast } = useToasts();
    const history = useHistory();
    const [isRemember, setIsRemember] = useState(false);
    const { register, handleSubmit, errors, setValue: setLoginValue } = useForm({
        mode: "onChange",
        defaultValues: { username: "", password: "" },
        criteriaMode: "all",
    });
    const { register: register2, errors: errors2, handleSubmit: handleSubmit2, setValue, control, watch, setError, clearErrors } = useForm({
        mode: "onChange",
        criteriaMode: "all",
    });

    useEffect(() => {
        if (getLocalData("isRemember") === "true") {
            setIsRemember(true);
            setLoginValue("username", getLocalData("loginEmail"));
        }
        getGender("M");
        getCountry(currentLanguageCode);
        setDefualtsValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    const setDefualtsValue = () => {
        // console.log(currentLocation);
        if (currentLocation.length > 0) {
            setValue("country", currentLocation.find((i) => i.types.some((i) => i === "country")).address_components[0].short_name);
            // // setValue('city', currentLocation.find(i => i.types.some(i => i == "locality")).address_components[0].short_name)
            setValue("stateProvince", currentLocation.find((i) => i.types.some((i) => i === "administrative_area_level_1")).address_components[0].long_name);
        }
    };
    const onSubmit = async (data) => {
        setLoader(true);
        try {
            let action = constant.ACTION.CUSTOMER + constant.ACTION.LOGIN;
            let param = { userName: data.username, password: data.loginPassword };
            let response = await WebService.post(action, param);
            if (response) {
                getCart(response.token);

                if (getLocalData("isRemember") === "true") {
                    setLocalData("loginEmail", data.username);
                } else {
                    setLocalData("loginEmail", "");
                }
                addToast("You have successfully logged in to this website", { appearance: "success", autoDismiss: true });
                setUser(response);
                setLocalData("token", response.token);
                history.push("my-account");
            }
            setLoader(false);
        } catch (error) {
            addToast("Incorrect username or password", { appearance: "error", autoDismiss: true });
            setLoader(false);
        }
    };

    const onConfirmPassword = (e) => {
        if (watch("password") !== e.target.value) {
            return setError(registerForm.repeatPassword.name, {
                type: "notMatch",
                message: "Repeat Password should be the same as a password",
            });
        }
    };
    const onPasswordChange = (e) => {
        if (watch("repeatPassword") !== "" && watch("repeatPassword") !== e.target.value) {
            return setError(registerForm.repeatPassword.name, {
                type: "notMatch",
                message: "Repeat Password should be the same as a password",
            });
        } else {
            clearErrors(registerForm.repeatPassword.name);
        }
    };
    const onRegister = async (data) => {
        const curCountry = countryData.filter((r) => {
            return r.code === data.country;
        });
        setLoader(true);
        try {
            let action = constant.ACTION.CUSTOMER + constant.ACTION.REGISTER;
            let param = {
                userName: data.email,
                password: data.password,
                emailAddress: data.email,
                gender: data.gender,
                language: currentLanguageCode,
                postalCode: data.postalCode,
                billing: {
                    country: curCountry[0]["name"],
                    countryCode: data.country,
                    stateProvince: data.stateProvince,
                    firstName: data.firstName,
                    lastName: data.lastName,
                },
            };

            let response = await WebService.post(action, param);
            if (response) {
                addToast("'You have successfully registerd in to this website.", { appearance: "success", autoDismiss: true });
                setUser(response);
                setLocalData("token", response.token);
                history.push("my-account");
            }
            setLoader(false);
        } catch (error) {
            addToast("Registering customer already exist", { appearance: "error", autoDismiss: true });
            setLoader(false);
        }
    };
    return (
        <Fragment>
            <MetaTags>
                <title>
                    {merchant.name} | {strings["Login"]}
                </title>
                {/* <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        /> */}
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>{strings["Home"]}</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>{strings["Login"]}</BreadcrumbsItem>
            <Layout headerContainerClass="container-fluid" headerPaddingClass="header-padding-2" headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    <Tab.Container defaultActiveKey={pathname.split("/")[1]}>
                                        <Nav variant="pills" className="login-register-tab-list">
                                            <Nav.Item>
                                                <Nav.Link eventKey="login">
                                                    <h4> {strings["Login"]}</h4>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="register">
                                                    <h4> {strings["Register"]}</h4>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="login">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form onSubmit={handleSubmit(onSubmit)}>
                                                            <div className="login-input">
                                                                <input
                                                                    type="text"
                                                                    name={loginForm.username.name}
                                                                    placeholder={strings["Email address"]}
                                                                    ref={register(loginForm.username.validate)}
                                                                />

                                                                {errors[loginForm.username.name] && (
                                                                    <p className="error-msg">{errors[loginForm.username.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="login-input">
                                                                <input
                                                                    type="text"
                                                                    className="user-password"
                                                                    name={loginForm.loginPassword.name}
                                                                    placeholder={strings["Password"]}
                                                                    ref={register(loginForm.loginPassword.validate)}
                                                                />
                                                                {errors[loginForm.loginPassword.name] && (
                                                                    <p className="error-msg">{errors[loginForm.loginPassword.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="button-box">
                                                                <div className="login-toggle-btn">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isRemember}
                                                                        onChange={(e) => {
                                                                            setIsRemember(!isRemember);
                                                                            e.target.checked
                                                                                ? setLocalData("isRemember", true)
                                                                                : setLocalData("isRemember", false);
                                                                        }}
                                                                    />
                                                                    <label className="ml-10">{strings["Remember me"]}</label>
                                                                    <Link to={"/forgot-password"}>{strings["Forgot Password?"]}</Link>
                                                                </div>
                                                                <button type="submit">
                                                                    <span>{strings["Login"]}</span>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="register">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form onSubmit={handleSubmit2(onRegister)}>
                                                            <p className="login-info">{strings["Login Information"]}</p>
                                                            <div className="login-input">
                                                                <input
                                                                    type="email"
                                                                    autoComplete="Email"
                                                                    name={registerForm.email.name}
                                                                    ref={register2(registerForm.email.validate)}
                                                                    placeholder={strings["Username"]}
                                                                />
                                                                {errors2[registerForm.email.name] && (
                                                                    <p className="error-msg">{errors2[registerForm.email.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="login-input">
                                                                <input
                                                                    type="password"
                                                                    autoComplete="new-password"
                                                                    name={registerForm.password.name}
                                                                    ref={register2(registerForm.password.validate)}
                                                                    placeholder={strings["Password"]}
                                                                    onChange={(e) => onPasswordChange(e)}
                                                                />
                                                                {errors2[registerForm.password.name] && (
                                                                    <p className="error-msg">{errors2[registerForm.password.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="login-input">
                                                                <input
                                                                    type="password"
                                                                    name={registerForm.repeatPassword.name}
                                                                    ref={register2(registerForm.repeatPassword.validate)}
                                                                    placeholder={strings["Repeat Password"]}
                                                                    onChange={(e) => onConfirmPassword(e)}
                                                                />
                                                                {errors2[registerForm.repeatPassword.name] && (
                                                                    <p className="error-msg">{errors2[registerForm.repeatPassword.name].message}</p>
                                                                )}
                                                            </div>
                                                            <p className="login-info">{strings["Personal Information"]}</p>
                                                            <div className="login-input">
                                                                <input
                                                                    type="text"
                                                                    name={registerForm.firstName.name}
                                                                    ref={register2(registerForm.firstName.validate)}
                                                                    placeholder={strings["First Name"]}
                                                                />
                                                                {errors2[registerForm.firstName.name] && (
                                                                    <p className="error-msg">{errors2[registerForm.firstName.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="login-input">
                                                                <input
                                                                    type="text"
                                                                    name={registerForm.lastName.name}
                                                                    ref={register2(registerForm.lastName.validate)}
                                                                    placeholder={strings["Last Name"]}
                                                                />
                                                                {errors2[registerForm.lastName.name] && (
                                                                    <p className="error-msg">{errors2[registerForm.lastName.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="login-input">
                                                                <Controller
                                                                    name={registerForm.gender.name}
                                                                    control={control}
                                                                    rules={registerForm.gender.validate}
                                                                    render={(props) => {
                                                                        return (
                                                                            <select
                                                                                onChange={(e) => {
                                                                                    props.onChange(e.target.value);
                                                                                    getGender(e.target.value);
                                                                                }}
                                                                                value={props.value}
                                                                            >
                                                                                <option>{strings["Select a gender"]}</option>
                                                                                {genderData.map((data, i) => {
                                                                                    return (
                                                                                        <option key={i} value={data.type}>
                                                                                            {data.name}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        );
                                                                    }}
                                                                />
                                                                {errors2[registerForm.gender.name] && (
                                                                    <p className="error-msg">{errors2[registerForm.gender.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="login-input">
                                                                <Controller
                                                                    name={registerForm.country.name}
                                                                    control={control}
                                                                    rules={registerForm.country.validate}
                                                                    render={(props) => {
                                                                        return (
                                                                            <select
                                                                                onChange={(e) => {
                                                                                    props.onChange(e.target.value);
                                                                                    getState(e.target.value);
                                                                                }}
                                                                                value={props.value}
                                                                            >
                                                                                <option>{strings["Select a country"]}</option>
                                                                                {countryData.map((data, i) => {
                                                                                    return (
                                                                                        <option key={i} value={data.code}>
                                                                                            {data.name}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        );
                                                                    }}
                                                                />
                                                                {errors2[registerForm.country.name] && (
                                                                    <p className="error-msg">{errors2[registerForm.country.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="login-input">
                                                                {stateData && stateData.length > 0 ? (
                                                                    <Controller
                                                                        name={registerForm.stateProvince.name}
                                                                        control={control}
                                                                        rules={registerForm.stateProvince.validate}
                                                                        render={(props) => {
                                                                            return (
                                                                                <select
                                                                                    onChange={(e) => {
                                                                                        props.onChange(e.target.value);
                                                                                    }}
                                                                                    value={props.value}
                                                                                >
                                                                                    <option>{strings["Select a state"]}</option>
                                                                                    {stateData.map((data, i) => {
                                                                                        return (
                                                                                            <option key={i} value={data.code}>
                                                                                                {data.name}
                                                                                            </option>
                                                                                        );
                                                                                    })}
                                                                                </select>
                                                                            );
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        name={registerForm.stateProvince.name}
                                                                        ref={register2(registerForm.stateProvince.validate)}
                                                                        placeholder={strings["State"]}
                                                                    />
                                                                )}
                                                                {errors2[registerForm.stateProvince.name] && (
                                                                    <p className="error-msg">{errors2[registerForm.stateProvince.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="login-input">
                                                                <input
                                                                    type="text"
                                                                    name={registerForm.postalCode.name}
                                                                    ref={register2(registerForm.postalCode.validate)}
                                                                    placeholder={strings["Postcode"]}
                                                                />
                                                                {errors2[registerForm.postalCode.name] && (
                                                                    <p className="error-msg">{errors2[registerForm.postalCode.name].message}</p>
                                                                )}
                                                            </div>
                                                            <div className="button-box">
                                                                <button type="submit">
                                                                    <span>{strings["Register"]}</span>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
};

LoginRegister.propTypes = {
    location: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        countryData: state.userData.country,
        genderData: state.userData.genders,
        cartItems: state.cartData.cartItems,
        currentLocation: state.userData.currentAddress,
        stateData: state.userData.state,
        defaultStore: state.merchantData.defaultStore,
        merchant: state.merchantData.merchant,
        currentLanguageCode: state.multilanguage.currentLanguageCode,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setLoader: (value) => {
            dispatch(setLoader(value));
        },
        setUser: (data) => {
            dispatch(setUser(data));
        },
        getCountry: (lang) => {
            dispatch(getCountry(lang));
        },
        getGender: (gender) => {
            dispatch(getGender(gender));
        },
        getState: (code) => {
            dispatch(getState(code));
        },
        getCart: (cartID) => {
            dispatch(getCart(cartID));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(LoginRegister));
