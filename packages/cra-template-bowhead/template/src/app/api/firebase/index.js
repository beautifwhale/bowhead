import { firebase } from '../../../utils/frontend/firebaseFrontend'

export const deleteLoggedInFirebaseUser = () => {
    return firebase
        .auth()
        .currentUser.delete()
}

export const userSignOut = () => {
    return firebase
        .auth()
        .signOut()
}

/**
 * 
 * @param {*} args.email users email address
*  @param {*} args.ref reference for email authentication
 * @param {*} args.data object with key/value pairs for URL params
 */
export const authenticateEmail = ({ email, ref, data }) => {
    const urlStr = process.env.NODE_ENV === "development"
        ? `http://localhost:8888/verify`
        : `https://mystifying-meninsky-44479e.netlify.app/verify`;

    const url = new URL(urlStr);

    if (ref) {
        url.searchParams.append("ref", ref);
    }
    data && Object.keys(data).forEach(key => {
        url.searchParams.append(key, data[key]);
    });

    return firebase
        .auth()
        .sendSignInLinkToEmail(email, {
            url: url.href,
            handleCodeInApp: true
        })
}

export const signInWithEmailLink = ({ email, location }) => {
    return firebase.auth().signInWithEmailLink(email, location)
}

export const isSignInWithEmailLink = ({ location }) => {
    return firebase.auth().isSignInWithEmailLink(location)
}