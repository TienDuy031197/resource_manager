const DemoData = {
    resources: [
        
    ],
    department: [
        {
            id: 1,
            nameDepartment: "All"
        },
        {
            id: 2,
            nameDepartment: "Phòng ban 1"
        },
        {
            id: 3,
            nameDepartment: "Phòng ban 2"
        },
        {
            id: 4,
            nameDepartment: "Phòng ban 3"
        }
    ],
    department1: [
        {
            lable: "nameDepartment",
            value: "Phòng ban 1"
        },
        {
            id: 2,
            nameDepartment: "Phòng ban 2"
        },
        {
            id: 3,
            nameDepartment: "Phòng ban 3"
        }
    ],
    jobtitle: [
        {
            id: 1,
            nameJob: "All"
        },
        {
            id: 2,
            nameJob: "Job 1"
        },
        {
            id: 3,
            nameJob: "Job 2"
        },
        {
            id: 4,
            nameJob: "Job 3"
        }
    ],
    skill: [
        {
            id: 1,
            nameSkill: "React"
        },
        {
            id: 2,
            nameSkill: "Java"
        },
        {
            id: 3,
            nameSkill: "Nodejs"
        }
    ],
    category:[
        {
            id: 1,
            nameCategory: "C1"
        },
        {
            id: 2,
            nameCategory: "C2"
        },
        {
            id:3,
            nameCategory: "C3"
        }
    ],
    events: [
        // {
        //     id: '5d9177c9a20e280004979496',
        //     start: '2018-01-05 00:00:00',
        //     end: '2018-01-08 23:59:59',
        //     resourceId: '5d8e258a7b38710004744e67',
        //     title: 'Project 7',
        //     bgColor: 'red',
        //     showPopover: false
        // },
        {
            id: 2,
            start: '2017-12-18 12:30:00',
            end: '2017-12-26 23:30:00',
            resourceId: 'r2',
            title: 'task2',
            resizable: false
        },
        {
            id: 3,
            start: '2017-12-19 12:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r3',
            title: 'task3',
            movable: false
        },
        {
            id: 4,
            start: '2017-12-19 14:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r4',
            title: 'task4',
            startResizable: false,
        },
        {
            id: 5,
            start: '2017-12-19 15:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r5',
            title: 'task5',
            endResizable: false
        },
        {
            id: 6,
            start: '2017-12-19 15:35:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r6',
            title: 'task6'
        },
        {
            id: 7,
            start: '2017-12-19 15:40:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r7',
            title: 'task6',
            bgColor: '#FA9E95'
        },
        {
            id: 8,
            start: '2017-12-19 15:50:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r1',
            title: 'task7',
            movable: false,
            resizable: false,
            bgColor: 'red'
        },
        {
            id: 9,
            start: '2017-12-19 16:30:00',
            end: '2017-12-27 23:30:00',
            resourceId: 'r1',
            title: 'task9'
        },
        {
            id: 10,
            start: '2017-12-19 17:30:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r1',
            title: 'task10',
            rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
            bgColor: '#f759ab'
        },
        {
            id: 11,
            start: '2017-12-19 18:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r1',
            title: 'task11'
        },
        {
            id: 12,
            start: '2017-12-20 18:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r1',
            title: 'task12'
        },
        {
            id: 13,
            start: '2017-12-21 18:30:00',
            end: '2017-12-24 23:30:00',
            resourceId: 'r1',
            title: 'task13'
        },
        {
            id: 14,
            start: '2017-12-23 18:30:00',
            end: '2017-12-27 23:30:00',
            resourceId: 'r1',
            title: 'task14'
        },
    ],
    eventsForTaskView: [
        // {
        //     id: 1,
        //     start: '2017-12-18 09:30:00',
        //     end: '2017-12-18 23:30:00',
        //     resourceId: 'r1',
        //     title: 'I am finished',
        //     bgColor: '#D9D9D9',
        //     groupId: 1,
        //     groupName: 'Task1'
        // },
        // {
        //     id: 2,
        //     start: '2017-12-18 12:30:00',
        //     end: '2017-12-26 23:30:00',
        //     resourceId: 'r2',
        //     title: 'I am not resizable',
        //     resizable: false,
        //     groupId: 2,
        //     groupName: 'Task2'
        // },
        // {
        //     id: 3,
        //     start: '2017-12-19 12:30:00',
        //     end: '2017-12-20 23:30:00',
        //     resourceId: 'r3',
        //     title: 'I am not movable',
        //     movable: false,
        //     groupId: 3,
        //     groupName: 'Task3'
        // },
        // {
        //     id: 7,
        //     start: '2017-12-19 15:40:00',
        //     end: '2017-12-20 23:30:00',
        //     resourceId: 'r7',
        //     title: 'I am exceptional',
        //     bgColor: '#FA9E95',
        //     groupId: 4,
        //     groupName: 'Task4'
        // },
        // {
        //     id: 4,
        //     start: '2017-12-20 14:30:00',
        //     end: '2017-12-21 23:30:00',
        //     resourceId: 'r4',
        //     title: 'I am not start-resizable',
        //     startResizable: false,
        //     groupId: 1,
        //     groupName: 'Task1'
        // },
        // {
        //     id: 5,
        //     start: '2017-12-21 15:30:00',
        //     end: '2017-12-22 23:30:00',
        //     resourceId: 'r5',
        //     title: 'I am not end-resizable',
        //     endResizable: false,
        //     groupId: 3,
        //     groupName: 'Task3'
        // },
        // {
        //     id: 9,
        //     start: '2017-12-21 16:30:00',
        //     end: '2017-12-21 23:30:00',
        //     resourceId: 'r1',
        //     title: 'R1 has many tasks',
        //     groupId: 4,
        //     groupName: 'Task4'
        // },
        // {
        //     id: 6,
        //     start: '2017-12-22 15:35:00',
        //     end: '2017-12-23 23:30:00',
        //     resourceId: 'r6',
        //     title: 'I am normal',
        //     groupId: 1,
        //     groupName: 'Task1'
        // },
        // {
        //     id: 8,
        //     start: '2017-12-25 15:50:00',
        //     end: '2017-12-26 23:30:00',
        //     resourceId: 'r1',
        //     title: 'I am locked',
        //     movable: false,
        //     resizable: false,
        //     bgColor: 'red',
        //     groupId: 1,
        //     groupName: 'Task1'
        // },
        // {
        //     id: 10,
        //     start: '2017-12-26 18:30:00',
        //     end: '2017-12-26 23:30:00',
        //     resourceId: 'r2',
        //     title: 'R2 has many tasks',
        //     groupId: 4,
        //     groupName: 'Task4'
        // },
        // {
        //     id: 11,
        //     start: '2017-12-27 18:30:00',
        //     end: '2017-12-27 23:30:00',
        //     resourceId: 'r14',
        //     title: 'R4 has many tasks',
        //     groupId: 4,
        //     groupName: 'Task4'
        // },
        // {
        //     id: 12,
        //     start: '2017-12-28 18:30:00',
        //     end: '2017-12-28 23:30:00',
        //     resourceId: 'r6',
        //     title: 'R6 has many tasks',
        //     groupId: 3,
        //     groupName: 'Task3'
        // },
    ],
    eventsForCustomEventStyle: [
        //     {
        //         id: 1,
        //         start: '2017-12-18 09:30:00',
        //         end: '2017-12-19 23:30:00',
        //         resourceId: 'r1',
        //         title: 'I am finished',
        //         bgColor: '#D9D9D9',
        //         type: 1
        //     },
        //     {
        //         id: 2,
        //         start: '2017-12-18 12:30:00',
        //         end: '2017-12-26 23:30:00',
        //         resourceId: 'r2',
        //         title: 'I am not resizable',
        //         resizable: false,
        //         type: 2
        //     },
        //     {
        //         id: 3,
        //         start: '2017-12-19 12:30:00',
        //         end: '2017-12-20 23:30:00',
        //         resourceId: 'r3',
        //         title: 'I am not movable',
        //         movable: false,
        //         type: 3
        //     },
        //     {
        //         id: 4,
        //         start: '2017-12-19 14:30:00',
        //         end: '2017-12-20 23:30:00',
        //         resourceId: 'r4',
        //         title: 'I am not start-resizable',
        //         startResizable: false,
        //         type: 1
        //     },
        //     {
        //         id: 5,
        //         start: '2017-12-19 15:30:00',
        //         end: '2017-12-20 23:30:00',
        //         resourceId: 'r5',
        //         title: 'I am not end-resizable',
        //         endResizable: false,
        //         type: 2
        //     },
        //     {
        //         id: 6,
        //         start: '2017-12-19 15:35:00',
        //         end: '2017-12-19 23:30:00',
        //         resourceId: 'r6',
        //         title: 'I am normal',
        //         type: 3
        //     },
        //     {
        //         id: 7,
        //         start: '2017-12-19 15:40:00',
        //         end: '2017-12-20 23:30:00',
        //         resourceId: 'r7',
        //         title: 'I am exceptional',
        //         bgColor: '#FA9E95',
        //         type: 1
        //     },
        //     {
        //         id: 8,
        //         start: '2017-12-19 15:50:00',
        //         end: '2017-12-19 23:30:00',
        //         resourceId: 'r1',
        //         title: 'I am locked',
        //         movable: false,
        //         resizable: false,
        //         bgColor: 'red',
        //         type: 2
        //     },
        //     {
        //         id: 9,
        //         start: '2017-12-19 16:30:00',
        //         end: '2017-12-27 23:30:00',
        //         resourceId: 'r1',
        //         title: 'R1 has many tasks 1',
        //         type: 3
        //     },
        //     {
        //         id: 10,
        //         start: '2017-12-20 18:30:00',
        //         end: '2017-12-20 23:30:00',
        //         resourceId: 'r1',
        //         title: 'R1 has many tasks 2',
        //         type: 1
        //     },
        //     {
        //         id: 11,
        //         start: '2017-12-21 18:30:00',
        //         end: '2017-12-22 23:30:00',
        //         resourceId: 'r1',
        //         title: 'R1 has many tasks 3',
        //         type: 2
        //     },
        //     {
        //         id: 12,
        //         start: '2017-12-23 18:30:00',
        //         end: '2017-12-27 23:30:00',
        //         resourceId: 'r1',
        //         title: 'R1 has many tasks 4',
        //         type: 3
        //     },
    ],
}

export default DemoData
