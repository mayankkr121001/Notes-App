import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new Error("Something went wrong while generating access and refresh Token")
    }
}

const registerUser = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (
        [username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ username })

    if (existedUser) {
        throw new ApiError(409, "User with username already exist")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(404, "Something went wrong while registering the user")
    }

    return res.status(201).json({ success: true, message: "User registered successfully", createdUser })

})

// const registerUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (
//             [username, password].some((field) => field?.trim() === "")
//         ) {
//             throw new ApiError(400, "All fields are required");
//         }

//         const existedUser = await User.findOne({ username })

//         if (existedUser) {
//             throw new ApiError(409, "User with username already exist")
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             username,
//             password: hashedPassword
//         })

//         const createdUser = await User.findById(user._id).select(
//             "-password -refreshToken"
//         )
//         if (!createdUser) {
//             throw new ApiError(404, "Something went wrong while registering the user")
//         }

//         res.status(201).json({ success: true, createdUser , message: "User registered successfully"})

//     } catch (error) {
//         res.status(error.statusCode || 500).json({
//             success: false,
//             statusCode: error.statusCode,
//             message: error.message
//         })
//     }

// }

const loginUser = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ username })

    if (!user) {
        throw new ApiError(409, "User does not exist.")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Password is not correct")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const logedInUser = await User.findById(user._id).select("-password -refreshToken")

    if (!logedInUser) {
        throw new ApiError(404, "Something went wrong while login the user")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ message: "User logged in successfully.", logedInUser, at: accessToken, rt: refreshToken })
    // .json({message:"User logged in successfully.", logedInUser})
})

const logoutUser = AsyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .send("User logged out successfully")


})

const refreshAccessToken = AsyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const { accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ message: "Access token refreshed", at: accessToken, rt: refreshToken })

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})

const getAuthorizedUser = AsyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(401, "User is not Authorized")
    }
    return res
        .status(200)
        .json({
            user: user,
            message: "User is Authorized."
        })
})

export { registerUser, loginUser, logoutUser, refreshAccessToken, getAuthorizedUser }    