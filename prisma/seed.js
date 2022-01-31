const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdCustomerAndContact = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    phone: "+55935935934",
                    email: "this@that.com"
                }
            }
        }
    });

    console.log('CustomerContact created:', createdCustomerAndContact);

    const createdScreen = await prisma.screen.create({
        data: {
            number: 5
            // screening: {
            //     create: {
            //         startsAt: new Date("2021-01-28T12:30:00Z")
            //     }
            // }
        }
    });

    const createdMovieScreening = await prisma.movie.create({
        data: {
            title: "Dune",
            runtimeMins: 156,
            screening: {
                create: {
                    startsAt: new Date("2021-01-28T12:30:00Z"),
                    screenId: createdScreen.id
                }
            }
        }
    });

    const createdTicket = await prisma.ticket.create({
        data: {
            customer: {
                connect: {
                    id: createdCustomerAndContact.id
                }
            },
            screening: {
                connect: {
                    id: createdMovieScreening.id
                }
            }
        }
    });

    console.log("New Movie and Screening:", createdMovieScreening);


    console.log("HERE", createdScreen);

    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
