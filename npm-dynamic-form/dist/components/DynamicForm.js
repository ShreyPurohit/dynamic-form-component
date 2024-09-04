"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const ai_1 = require("react-icons/ai");
const react_2 = __importDefault(require("react"));
const DynamicForm = ({ fields, onSubmit }) => {
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({ mode: 'all' });
    const renderField = (field) => {
        var _a, _b;
        const error = (_a = errors[field.id]) === null || _a === void 0 ? void 0 : _a.message;
        const isPasswordField = field.type === 'password';
        const inputType = isPasswordField && showPassword ? 'text' : field.type;
        return (react_2.default.createElement("div", { id: 'input-wrapper' },
            react_2.default.createElement("div", { id: 'input-container' }, field.type === 'checkbox' && field.options ? (react_2.default.createElement("div", { className: 'grid grid-cols-2 gap-4' }, field.options.map(option => (react_2.default.createElement("div", { key: option.value, className: 'flex gap-1 items-center justify-center' },
                react_2.default.createElement("label", { htmlFor: `${field.id}-${option.value}`, className: 'ml-2 mt-1' },
                    option.label,
                    " :"),
                react_2.default.createElement("input", Object.assign({ id: `${field.id}-${option.value}` }, register(field.id, Object.assign({}, field.validation)), { type: field.type, value: option.value, className: 'w-max' }))))))) : field.type === 'select' ? (react_2.default.createElement("select", Object.assign({}, register(field.id, Object.assign({}, field.validation)), { id: field.id }), (_b = field.options) === null || _b === void 0 ? void 0 : _b.map((option) => (react_2.default.createElement("option", { key: option.value, value: option.value }, option.label))))) : (react_2.default.createElement("div", { className: 'flex items-center p-1 border' },
                field.icon && react_2.default.createElement("div", { className: 'ml-2' }, field.icon),
                react_2.default.createElement("input", Object.assign({ id: field.id }, register(field.id, Object.assign({}, field.validation)), { type: inputType, placeholder: field.placeholder })),
                isPasswordField && (react_2.default.createElement("div", { id: "prop-icon", className: "hover:cursor-pointer mr-3", onClick: () => setShowPassword(!showPassword) }, showPassword ? react_2.default.createElement(ai_1.AiOutlineEye, null) : react_2.default.createElement(ai_1.AiOutlineEyeInvisible, null)))))),
            error && react_2.default.createElement("span", { id: field.errorId }, error)));
    };
    return (react_2.default.createElement("main", { className: 'md:w-3/4 m-auto md:h-0' },
        react_2.default.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col md:w-1/2 m-auto p-5 gap-5 md:mt-5 md:border border-black" },
            fields.map((field) => (react_2.default.createElement("div", { key: field.id },
                react_2.default.createElement("label", { htmlFor: field.id }, field.label),
                renderField(field)))),
            react_2.default.createElement("button", { type: 'submit', disabled: Object.keys(errors).length ? true : false, className: 'px-4 py-2 bg-slate-400 hover:bg-slate-600 hover:transition hover:text-white rounded-lg disabled:bg-gray-600 disabled:hover:bg-gray-600' }, "Submit"))));
};
exports.default = DynamicForm;
