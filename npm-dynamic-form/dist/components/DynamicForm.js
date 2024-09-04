"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const ai_1 = require("react-icons/ai");
const CustomizedDynamicForm = ({ fields, onSubmit, cssFramework }) => {
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({ mode: 'all' });
    const renderField = (field) => {
        var _a, _b;
        const error = (_a = errors[field.id]) === null || _a === void 0 ? void 0 : _a.message;
        const isPasswordField = field.type === 'password';
        const inputType = isPasswordField && showPassword ? 'text' : field.type;
        return (react_1.default.createElement("div", { id: 'input-wrapper', className: cssFramework === 'bootstrap' ? 'mb-3 w-1' : '' },
            react_1.default.createElement("div", { id: 'input-container', className: cssFramework === 'bootstrap' ? 'input-group' : '' }, field.type === 'checkbox' && field.options ? (react_1.default.createElement("div", { className: cssFramework === 'bootstrap' ? 'row' : 'grid grid-cols-2 gap-4' }, field.options.map(option => (react_1.default.createElement("div", { key: option.value, className: cssFramework === 'bootstrap' ? 'col-6 d-flex align-items-center' : 'flex gap-1 justify-center' },
                react_1.default.createElement("label", { htmlFor: `${field.id}-${option.value}`, className: cssFramework === 'bootstrap' ? 'form-check-label ms-2' : 'ml-2' },
                    option.label,
                    " :"),
                react_1.default.createElement("input", Object.assign({ id: `${field.id}-${option.value}` }, register(field.id, Object.assign({}, field.validation)), { type: field.type, value: option.value, className: cssFramework === 'bootstrap' ? 'form-check-input ms-2' : '' }))))))) : field.type === 'select' ? (react_1.default.createElement("select", Object.assign({}, register(field.id, Object.assign({}, field.validation)), { id: field.id, className: cssFramework === 'bootstrap' ? 'form-select' : "border rounded w-full sm:py-2 sm:px-3 py-1 px-3 text-stone-600 leading-tight focus:outline-none text-sm sm:text-base" }), (_b = field.options) === null || _b === void 0 ? void 0 : _b.map((option) => (react_1.default.createElement("option", { key: option.value, value: option.value }, option.label))))) : (react_1.default.createElement("div", { className: cssFramework === 'bootstrap' ? 'input-group' : 'flex items-center p-1 border' },
                field.icon && react_1.default.createElement("div", { className: cssFramework === 'bootstrap' ? 'input-group-text' : 'ml-2' }, field.icon),
                react_1.default.createElement("input", Object.assign({ id: field.id }, register(field.id, Object.assign({}, field.validation)), { type: inputType, placeholder: field.placeholder, className: cssFramework === 'bootstrap' ? `form-control ${error ? 'is-invalid' : ''}` : 'rounded w-full sm:py-2 sm:px-3 py-1 px-2 text-stone-600 leading-tight focus:outline-none text-sm sm:text-base' })),
                isPasswordField && (react_1.default.createElement("div", { id: "prop-icon", className: cssFramework === 'bootstrap' ? 'input-group-text' : 'hover:cursor-pointer mr-3', onClick: () => setShowPassword(!showPassword) }, showPassword ? react_1.default.createElement(ai_1.AiOutlineEye, null) : react_1.default.createElement(ai_1.AiOutlineEyeInvisible, null)))))),
            error && react_1.default.createElement("div", { className: cssFramework === 'bootstrap' ? 'text-danger' : 'text-orange-500 italic text-sm sm:text-base', id: field.errorId }, error)));
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit), className: cssFramework === 'bootstrap' ? 'card p-4 w-50 m-auto' : 'flex flex-col md:w-1/2 m-auto p-5 gap-5 md:mt-5 md:border border-slate-400 rounded-lg' },
        fields.map((field) => (react_1.default.createElement("div", { key: field.id, className: cssFramework === 'bootstrap' ? 'mb-3' : '' },
            react_1.default.createElement("label", { htmlFor: field.id, className: cssFramework === 'bootstrap' ? "form-label" : "block text-gray-700 sm:text-lg font-bold mb-2" }, field.label),
            renderField(field)))),
        react_1.default.createElement("button", { type: 'submit', disabled: Object.keys(errors).length ? true : false, className: cssFramework === 'bootstrap' ? 'btn btn-primary w-100 mt-3' : 'px-4 py-2 bg-slate-400 hover:bg-slate-600 hover:transition hover:text-white rounded-lg disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:text-white' }, "Submit")));
};
exports.default = CustomizedDynamicForm;
