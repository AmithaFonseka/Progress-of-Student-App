import { z } from "zod";
import { SchoolDetailSchema, AcedamicDetailSchema, StudentDataschema } from "./schema";



// datafile handler types
export interface TSubject {
    [key: string]: number
}

export interface TStudentDetails {
    name: string,
    index: string,
    total?: number,
    avarage?: number,
    rank?: number,
    [key: string]: any   //string | number | undefined
}

export type TStudentData = {
    subjects: TSubject[],
} & TStudentDetails



// store types

export type TSchoolDetails = {
    id?: number,
} & z.infer<typeof SchoolDetailSchema>
export type TAcedamicDetails = {
    id?: number,
} & z.infer<typeof AcedamicDetailSchema>
export type TStudentDataFile = z.infer<typeof StudentDataschema>





export type TStoreActions = {

    DataHandler: (schoolDetails: TSchoolDetails, acedamicDetail: TAcedamicDetails, studentData: TStudentDataFile) => Promise<void>,
    setLoading: (loading: boolean) => Boolean
    setHeader: (header: string[]) => void
    getStudentDataById: (id: string) => Promise<TStudentData>
    resetDatabase: () => Promise<void>
    searchAction: (search: string) => Promise<void>
    updateSchool: (schoolDetails: TSchoolDetails) => Promise<boolean | void>
    updateAcedamic: (acedamicDetail: TAcedamicDetails) => Promise<boolean | void>
    setupdatebtnspinner: (updatebtnspinner: boolean) => void
    updateStudentData: (studentData: TStudentData, editId: string) => Promise<boolean | void>
    removetoast: (id: number) => void
    deleteStudentData: (id: string) => Promise<void>
    addNewStudent: (studentData: TStudentData) => Promise<boolean | void>
    getPDF: (type: "allinone" | "allmultiple" | "byId", id?: string) => Promise<Blob | string | void>
}

export type TStoreState = {
    schoolDetails: TSchoolDetails | undefined,
    acedamicDetail: TAcedamicDetails | undefined,
    studentData: TStudentData[] | undefined,
    loading: boolean,
    header: string[] | undefined
    updatebtnspinner: boolean
    toast: {
        id: string,
        message: string,
        type: "error" | "success" | "warning" | "info" | undefined,
    }[]
}




export type TopenStudentAddModel = {
    open: boolean,
    type: "add" | "edit",
    id?: string
};


export type Tblobstore = {
    id: string,
    blob: Blob
}

// types of pdf generators

export type TPDFGenProps = {
    schoolDetails: TSchoolDetails | undefined,
    acedamicDetail: TAcedamicDetails | undefined,
    studentData: TStudentData | undefined,
    TableHeader: string[] | undefined

}




