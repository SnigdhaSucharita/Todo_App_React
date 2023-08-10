"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../middleware/index");
const index_2 = require("../db/index");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const user = yield index_2.User.findOne({ username: input.username });
    if (user) {
        res.status(403).json({ message: "User already exists" });
    }
    else {
        const newUser = new index_2.User(input);
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, index_1.SECRET, { expiresIn: "1h" });
        res.json({ message: "User created successfully", token });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const user = yield index_2.User.findOne({ username: input.username, password: input.password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, index_1.SECRET, { expiresIn: "1h" });
        res.json({ message: "Logged in successfully", token });
    }
    else {
        res.status(403).json({ message: "Invalid username or password" });
    }
}));
router.get("/me", index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_2.User.findOne({ _id: req.headers.userId });
    if (user) {
        res.json({ username: user.username });
    }
    else {
        res.status(403).json({ message: "User not logged in" });
    }
}));
exports.default = router;