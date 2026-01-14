export declare function listAllSchools(): Promise<{
    stats: {
        students: number;
        teachers: number;
        classes: number;
    };
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    instituteName: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    website?: string;
    establishedYear?: number;
    isEmailVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    _id: import("mongoose").FlattenMaps<unknown>;
    $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths> | undefined) => Omit<import("../models/Admin.model").Admin, keyof Paths> & Paths;
    $clearModifiedPaths: () => import("../models/Admin.model").Admin;
    $clone: () => import("../models/Admin.model").Admin;
    $createModifiedPathsSnapshot: () => import("mongoose").ModifiedPathsSnapshot;
    $getAllSubdocs: () => import("mongoose").Document[];
    $ignore: (path: string) => void;
    $isDefault: (path?: string) => boolean;
    $isDeleted: (val?: boolean) => boolean;
    $getPopulatedDocs: () => import("mongoose").Document[];
    $inc: (path: string | string[], val?: number) => import("../models/Admin.model").Admin;
    $isEmpty: (path: string) => boolean;
    $isValid: (path: string) => boolean;
    $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
    $markValid: (path: string) => void;
    $model: {
        <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>>(name: string): ModelType;
        <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
    };
    $op: "save" | "validate" | "remove" | null;
    $restoreModifiedPathsSnapshot: (snapshot: import("mongoose").ModifiedPathsSnapshot) => import("../models/Admin.model").Admin;
    $session: (session?: import("mongoose").ClientSession | null) => import("mongoose").ClientSession | null;
    $set: {
        (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (value: string | Record<string, any>): import("../models/Admin.model").Admin;
    };
    $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
    baseModelName?: string;
    collection: import("mongoose").FlattenMaps<import("mongoose").Collection<import("bson").Document>>;
    db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
    deleteOne: (options?: import("mongoose").QueryOptions) => any;
    depopulate: <Paths = {}>(path?: string | string[]) => import("mongoose").MergeType<import("../models/Admin.model").Admin, Paths>;
    directModifiedPaths: () => Array<string>;
    equals: (doc: import("mongoose").Document<unknown, any, any, Record<string, any>, {}>) => boolean;
    errors?: import("mongoose").Error.ValidationError;
    get: {
        <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
        (path: string, type?: any, options?: any): any;
    };
    getChanges: () => import("mongoose").UpdateQuery<import("../models/Admin.model").Admin>;
    id?: any;
    increment: () => import("../models/Admin.model").Admin;
    init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("../models/Admin.model").Admin;
    invalidate: {
        <T extends string | number | symbol>(path: T, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
        (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
    };
    isDirectModified: {
        <T extends string | number | symbol>(path: T | T[]): boolean;
        (path: string | Array<string>): boolean;
    };
    isDirectSelected: {
        <T extends string | number | symbol>(path: T): boolean;
        (path: string): boolean;
    };
    isInit: {
        <T extends string | number | symbol>(path: T): boolean;
        (path: string): boolean;
    };
    isModified: {
        <T extends string | number | symbol>(path?: T | T[] | undefined, options?: {
            ignoreAtomics?: boolean;
        } | null): boolean;
        (path?: string | Array<string>, options?: {
            ignoreAtomics?: boolean;
        } | null): boolean;
    };
    isNew: boolean;
    isSelected: {
        <T extends string | number | symbol>(path: T): boolean;
        (path: string): boolean;
    };
    markModified: {
        <T extends string | number | symbol>(path: T, scope?: any): void;
        (path: string, scope?: any): void;
    };
    model: {
        <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>>(name: string): ModelType;
        <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
    };
    modifiedPaths: (options?: {
        includeChildren?: boolean;
    }) => Array<string>;
    overwrite: (obj: import("mongoose").AnyObject) => import("../models/Admin.model").Admin;
    $parent: () => import("mongoose").Document | undefined;
    populate: {
        <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("../models/Admin.model").Admin, Paths>>;
        <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("../models/Admin.model").Admin, Paths>>;
    };
    populated: (path: string) => any;
    replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("../models/Admin.model").Admin, {}, unknown, "find", Record<string, never>>;
    save: (options?: import("mongoose").SaveOptions) => Promise<import("../models/Admin.model").Admin>;
    schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    }>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    }> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>>;
    set: {
        <T extends string | number | symbol>(path: T, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (value: string | Record<string, any>): import("../models/Admin.model").Admin;
    };
    toJSON: {
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            virtuals: true;
            flattenObjectIds: true;
        }): Omit<{
            [x: string]: any;
        }, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            virtuals: true;
            flattenObjectIds: true;
        }): {
            [x: string]: any;
        };
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            virtuals: true;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            flattenObjectIds: true;
        }): {
            [x: string]: any;
            [x: number]: any;
            [x: symbol]: any;
        };
        (options: import("mongoose").ToObjectOptions & {
            virtuals: true;
        }): any;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
        }): Omit<any, "__v">;
        (options?: import("mongoose").ToObjectOptions & {
            flattenMaps?: true;
            flattenObjectIds?: false;
        }): import("mongoose").FlattenMaps<any>;
        (options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: false;
        }): import("mongoose").FlattenMaps<any>;
        (options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: true;
        }): {
            [x: string]: any;
        };
        (options: import("mongoose").ToObjectOptions & {
            flattenMaps: false;
        }): any;
        (options: import("mongoose").ToObjectOptions & {
            flattenMaps: false;
            flattenObjectIds: true;
        }): any;
        <T = any>(options?: import("mongoose").ToObjectOptions & {
            flattenMaps?: true;
            flattenObjectIds?: false;
        }): import("mongoose").FlattenMaps<T>;
        <T = any>(options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: false;
        }): import("mongoose").FlattenMaps<T>;
        <T = any>(options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: true;
        }): import("mongoose").ObjectIdToString<import("mongoose").FlattenMaps<T>>;
        <T = any>(options: import("mongoose").ToObjectOptions & {
            flattenMaps: false;
        }): T;
        <T = any>(options: import("mongoose").ToObjectOptions & {
            flattenMaps: false;
            flattenObjectIds: true;
        }): import("mongoose").ObjectIdToString<T>;
    };
    toObject: {
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            virtuals: true;
            flattenObjectIds: true;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            virtuals: true;
            flattenObjectIds: true;
        }): any;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            flattenObjectIds: true;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            virtuals: true;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            virtuals: true;
        }): any;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: true;
        }): any;
        (options?: import("mongoose").ToObjectOptions): any;
        <T>(options?: import("mongoose").ToObjectOptions): import("mongoose").Require_id<T> & {
            __v: number;
        };
    };
    unmarkModified: {
        <T extends string | number | symbol>(path: T): void;
        (path: string): void;
    };
    updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("../models/Admin.model").Admin> | undefined, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("../models/Admin.model").Admin, {}, unknown, "find", Record<string, never>>;
    validate: {
        <T extends string | number | symbol>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): Promise<void>;
        (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
        (options: {
            pathsToSkip?: import("mongoose").pathsToSkip;
        }): Promise<void>;
    };
    validateSync: {
        (options: {
            pathsToSkip?: import("mongoose").pathsToSkip;
            [k: string]: any;
        }): import("mongoose").Error.ValidationError | null;
        <T extends string | number | symbol>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
        (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
    };
    __v: number;
}[]>;
export declare function getSchoolDetails(schoolId: string): Promise<{
    stats: {
        students: number;
        teachers: number;
        classes: number;
        attendance: number;
        exams: number;
        fees: number;
        homework: number;
        notices: number;
        timetables: number;
        medicalRecords: number;
    };
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    instituteName: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    website?: string;
    establishedYear?: number;
    isEmailVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    _id: import("mongoose").FlattenMaps<unknown>;
    $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths> | undefined) => Omit<import("../models/Admin.model").Admin, keyof Paths> & Paths;
    $clearModifiedPaths: () => import("../models/Admin.model").Admin;
    $clone: () => import("../models/Admin.model").Admin;
    $createModifiedPathsSnapshot: () => import("mongoose").ModifiedPathsSnapshot;
    $getAllSubdocs: () => import("mongoose").Document[];
    $ignore: (path: string) => void;
    $isDefault: (path?: string) => boolean;
    $isDeleted: (val?: boolean) => boolean;
    $getPopulatedDocs: () => import("mongoose").Document[];
    $inc: (path: string | string[], val?: number) => import("../models/Admin.model").Admin;
    $isEmpty: (path: string) => boolean;
    $isValid: (path: string) => boolean;
    $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
    $markValid: (path: string) => void;
    $model: {
        <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>>(name: string): ModelType;
        <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
    };
    $op: "save" | "validate" | "remove" | null;
    $restoreModifiedPathsSnapshot: (snapshot: import("mongoose").ModifiedPathsSnapshot) => import("../models/Admin.model").Admin;
    $session: (session?: import("mongoose").ClientSession | null) => import("mongoose").ClientSession | null;
    $set: {
        (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (value: string | Record<string, any>): import("../models/Admin.model").Admin;
    };
    $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
    baseModelName?: string;
    collection: import("mongoose").FlattenMaps<import("mongoose").Collection<import("bson").Document>>;
    db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
    deleteOne: (options?: import("mongoose").QueryOptions) => any;
    depopulate: <Paths = {}>(path?: string | string[]) => import("mongoose").MergeType<import("../models/Admin.model").Admin, Paths>;
    directModifiedPaths: () => Array<string>;
    equals: (doc: import("mongoose").Document<unknown, any, any, Record<string, any>, {}>) => boolean;
    errors?: import("mongoose").Error.ValidationError;
    get: {
        <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
        (path: string, type?: any, options?: any): any;
    };
    getChanges: () => import("mongoose").UpdateQuery<import("../models/Admin.model").Admin>;
    id?: any;
    increment: () => import("../models/Admin.model").Admin;
    init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("../models/Admin.model").Admin;
    invalidate: {
        <T extends string | number | symbol>(path: T, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
        (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
    };
    isDirectModified: {
        <T extends string | number | symbol>(path: T | T[]): boolean;
        (path: string | Array<string>): boolean;
    };
    isDirectSelected: {
        <T extends string | number | symbol>(path: T): boolean;
        (path: string): boolean;
    };
    isInit: {
        <T extends string | number | symbol>(path: T): boolean;
        (path: string): boolean;
    };
    isModified: {
        <T extends string | number | symbol>(path?: T | T[] | undefined, options?: {
            ignoreAtomics?: boolean;
        } | null): boolean;
        (path?: string | Array<string>, options?: {
            ignoreAtomics?: boolean;
        } | null): boolean;
    };
    isNew: boolean;
    isSelected: {
        <T extends string | number | symbol>(path: T): boolean;
        (path: string): boolean;
    };
    markModified: {
        <T extends string | number | symbol>(path: T, scope?: any): void;
        (path: string, scope?: any): void;
    };
    model: {
        <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, any>>(name: string): ModelType;
        <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
    };
    modifiedPaths: (options?: {
        includeChildren?: boolean;
    }) => Array<string>;
    overwrite: (obj: import("mongoose").AnyObject) => import("../models/Admin.model").Admin;
    $parent: () => import("mongoose").Document | undefined;
    populate: {
        <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("../models/Admin.model").Admin, Paths>>;
        <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("../models/Admin.model").Admin, Paths>>;
    };
    populated: (path: string) => any;
    replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("../models/Admin.model").Admin, {}, unknown, "find", Record<string, never>>;
    save: (options?: import("mongoose").SaveOptions) => Promise<import("../models/Admin.model").Admin>;
    schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    }>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    }> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>>;
    set: {
        <T extends string | number | symbol>(path: T, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("../models/Admin.model").Admin;
        (value: string | Record<string, any>): import("../models/Admin.model").Admin;
    };
    toJSON: {
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            virtuals: true;
            flattenObjectIds: true;
        }): Omit<{
            [x: string]: any;
        }, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            virtuals: true;
            flattenObjectIds: true;
        }): {
            [x: string]: any;
        };
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            virtuals: true;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            flattenObjectIds: true;
        }): {
            [x: string]: any;
            [x: number]: any;
            [x: symbol]: any;
        };
        (options: import("mongoose").ToObjectOptions & {
            virtuals: true;
        }): any;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
        }): Omit<any, "__v">;
        (options?: import("mongoose").ToObjectOptions & {
            flattenMaps?: true;
            flattenObjectIds?: false;
        }): import("mongoose").FlattenMaps<any>;
        (options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: false;
        }): import("mongoose").FlattenMaps<any>;
        (options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: true;
        }): {
            [x: string]: any;
        };
        (options: import("mongoose").ToObjectOptions & {
            flattenMaps: false;
        }): any;
        (options: import("mongoose").ToObjectOptions & {
            flattenMaps: false;
            flattenObjectIds: true;
        }): any;
        <T = any>(options?: import("mongoose").ToObjectOptions & {
            flattenMaps?: true;
            flattenObjectIds?: false;
        }): import("mongoose").FlattenMaps<T>;
        <T = any>(options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: false;
        }): import("mongoose").FlattenMaps<T>;
        <T = any>(options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: true;
        }): import("mongoose").ObjectIdToString<import("mongoose").FlattenMaps<T>>;
        <T = any>(options: import("mongoose").ToObjectOptions & {
            flattenMaps: false;
        }): T;
        <T = any>(options: import("mongoose").ToObjectOptions & {
            flattenMaps: false;
            flattenObjectIds: true;
        }): import("mongoose").ObjectIdToString<T>;
    };
    toObject: {
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            virtuals: true;
            flattenObjectIds: true;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            virtuals: true;
            flattenObjectIds: true;
        }): any;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            flattenObjectIds: true;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
            virtuals: true;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            virtuals: true;
        }): any;
        (options: import("mongoose").ToObjectOptions & {
            versionKey: false;
        }): Omit<any, "__v">;
        (options: import("mongoose").ToObjectOptions & {
            flattenObjectIds: true;
        }): any;
        (options?: import("mongoose").ToObjectOptions): any;
        <T>(options?: import("mongoose").ToObjectOptions): import("mongoose").Require_id<T> & {
            __v: number;
        };
    };
    unmarkModified: {
        <T extends string | number | symbol>(path: T): void;
        (path: string): void;
    };
    updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("../models/Admin.model").Admin> | undefined, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("../models/Admin.model").Admin, {}, unknown, "find", Record<string, never>>;
    validate: {
        <T extends string | number | symbol>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): Promise<void>;
        (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
        (options: {
            pathsToSkip?: import("mongoose").pathsToSkip;
        }): Promise<void>;
    };
    validateSync: {
        (options: {
            pathsToSkip?: import("mongoose").pathsToSkip;
            [k: string]: any;
        }): import("mongoose").Error.ValidationError | null;
        <T extends string | number | symbol>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
        (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
    };
    __v: number;
}>;
export declare function updateSchool(schoolId: string, updateData: any): Promise<(import("mongoose").Document<unknown, {}, import("../models/Admin.model").Admin, {}, {}> & import("../models/Admin.model").Admin & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare function deleteSchool(schoolId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/Admin.model").Admin, {}, {}> & import("../models/Admin.model").Admin & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare function getSchoolStudents(schoolId: string, filters?: any): Promise<(import("mongoose").FlattenMaps<import("../models/Student.model").Student> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function createSchoolStudent(schoolId: string, studentData: any): Promise<import("mongoose").Document<unknown, {}, import("../models/Student.model").Student, {}, {}> & import("../models/Student.model").Student & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare function updateAnyStudent(studentId: string, updateData: any): Promise<(import("mongoose").Document<unknown, {}, import("../models/Student.model").Student, {}, {}> & import("../models/Student.model").Student & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare function deleteAnyStudent(studentId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/Student.model").Student, {}, {}> & import("../models/Student.model").Student & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare function getAllStudents(): Promise<(import("mongoose").FlattenMaps<import("../models/Student.model").Student> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function getSchoolTeachers(schoolId: string, filters?: any): Promise<(import("mongoose").FlattenMaps<import("../models/Teacher.model").ITeacher> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare function createSchoolTeacher(schoolId: string, teacherData: any): Promise<import("mongoose").Document<unknown, {}, import("../models/Teacher.model").ITeacher, {}, {}> & import("../models/Teacher.model").ITeacher & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare function updateAnyTeacher(teacherId: string, updateData: any): Promise<(import("mongoose").Document<unknown, {}, import("../models/Teacher.model").ITeacher, {}, {}> & import("../models/Teacher.model").ITeacher & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}) | null>;
export declare function deleteAnyTeacher(teacherId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/Teacher.model").ITeacher, {}, {}> & import("../models/Teacher.model").ITeacher & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}) | null>;
export declare function getAllTeachers(): Promise<(import("mongoose").FlattenMaps<import("../models/Teacher.model").ITeacher> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare function getSchoolClasses(schoolId: string): Promise<(import("mongoose").FlattenMaps<import("../models/Class.model").Class> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function getSchoolAttendance(schoolId: string, filters?: any): Promise<(import("mongoose").FlattenMaps<import("../models/Attendance.model").Attendance> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function getSchoolExams(schoolId: string): Promise<(import("mongoose").FlattenMaps<import("../models/Exam.model").Exam> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function getSchoolFees(schoolId: string): Promise<(import("mongoose").FlattenMaps<import("../models/Fee.model").Fee> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function getSchoolHomework(schoolId: string): Promise<(import("mongoose").FlattenMaps<import("../models/Homework.model").Homework> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function getSchoolNotices(schoolId: string): Promise<(import("mongoose").FlattenMaps<import("../models/Notice.model").Notice> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function getSchoolTimetables(schoolId: string): Promise<(import("mongoose").FlattenMaps<import("../models/Timetable.model").Timetable> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function getSchoolMedicalRecords(schoolId: string): Promise<(import("mongoose").FlattenMaps<import("../models/MedicalRecord.model").MedicalRecord> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})[]>;
export declare function getSuperAdminDashboardStats(): Promise<{
    schools: number;
    students: number;
    teachers: number;
    classes: number;
}>;
//# sourceMappingURL=super-admin.service.d.ts.map