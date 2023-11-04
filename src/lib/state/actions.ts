
import { handleFileRead } from "../utils/datafilehandler";
import { TempStudentData, TempAcedamicData, TempSchoolData, TempHeaderData } from '../tempData/data';
import initialState from './initialState';
import db, { resetDatabase } from "@/lib/models/db"
import rankingMethod from "../utils/rankingMethod";
import { TStudentData } from "../types";


// function for simulate delay for testing loading state 
const delay = async (delay = 1000, callback = () => { }) => {

    const delayPromise = ms => new Promise(res => setTimeout(res, ms))
    await delayPromise(delay)

    callback()
}

/*

simulate delay for testing loading state

const funcCallback = () => { console.info('msg WITH delay > 2') }

await delay(5000, funcCallback)

const data = await db.schoolDetails.toArray()

*/




const actions = (set) => ({

    async DataHandler(schoolDetails, acedamicDetail, studentData) {


        const data = await handleFileRead(studentData);


        await db.acedamicDetail.put(TempAcedamicData)
        await db.schoolDetails.put(TempSchoolData)
        await db.studentData.bulkPut(TempStudentData)
        await db.header.put(TempHeaderData)


        return set({ schoolDetails, acedamicDetail, studentData: data })
    },

    setLoading(loading) { return set({ loading }) },

    setHeader(header) {
        return set({ header })
    },


    async resetDatabase() {

        await resetDatabase();
        return set({ ...initialState })
    },



    async searchAction(search) {

        console.log(search);


        if (search.trim() === '') {

            const data = await db.studentData.toArray()
            return set({ studentData: data })
        }


        const dataofindex = await db.studentData.where('index').startsWithIgnoreCase(search.trim()).toArray()
        const dataofname = await db.studentData.where('name').startsWithIgnoreCase(search.trim()).toArray()

        console.log(Array.prototype.concat(dataofindex, dataofname));


        return set({ studentData: Array.prototype.concat(dataofindex, dataofname) })


    },


    removetoast(id) {
        set(state => ({
            toast: state.toast.filter((item, index) => index !== id),
        }))
    },


    async updateSchool(schoolDetails) {

        const data = await db.schoolDetails.toArray()


        await db.schoolDetails.update(data[0].id, schoolDetails).then((updated) => {
            if (updated) {
                set({ schoolDetails })



            } else {

            }
        }).catch((err) => {


            set(state => {
                return {
                    toast: [...state.toast, { message: 'Somthing went wrong check your', type: 'error' }]
                }
            })


        })


    },


    async updateAcedamic(acedamicDetail) {
        const data = await db.acedamicDetail.toArray()
        await db.acedamicDetail.update(data[0].id, acedamicDetail).then((updated) => {
            if (updated) {
                set({ acedamicDetail })

            } else {

            }
        }).catch((err) => {
            console.log(err);

        })
    },


    setupdatebtnspinner(updatebtnspinner) { set({ updatebtnspinner: updatebtnspinner }) },


    async updateStudentData(studentData: TStudentData) {
        try {

            set({ updatebtnspinner: true })

            const checkDuplidatedData = await db.studentData.where('index').equals(studentData.index.trim()).toArray()
            if (checkDuplidatedData.length > 0) {
                set(state => {
                    return {
                        toast: [...state.toast, { message: 'Duplicate Index, the index number provided already exsist', type: 'error' }]
                    }
                })

            }

            set(state => {



                let totalmark = 0

                studentData.subjects.forEach((subject) => {
                    totalmark += Object.values(subject)[0]
                })

                const data = [...state.studentData, { ...studentData, total: totalmark, avarage: totalmark / studentData.subjects.length }]

                const rerankedData = rankingMethod(data)



                const uploaded = db.studentData.bulkPut(rerankedData)

                if (uploaded) {
                    return {
                        studentData: rerankedData,
                        toast: [...state.toast, { message: 'Student data updated successfully', type: 'success' }]
                    }
                }








            })


        } catch (error) {

            set(state => {
                return {
                    toast: [...state.toast, { message: 'Somthing went wrong check your', type: 'error' }]
                }
            })
        } finally {
            set({ updatebtnspinner: false })
        }




    },



})



export default actions;