import { UserEntity } from '@entities/users.entity';

export const loadSeed = async () => {
    const users = await UserEntity.find();

    if (!users.length) {
        await UserEntity.create({ email: 'demo1@gmail.com', fullName: 'Muhammad Saloh', password: '12345' }).save();
        await UserEntity.create({ email: 'demo2@gmail.com', fullName: 'Abdulloh Abdushukurov', password: '12345' }).save();
        await UserEntity.create({ email: 'demo3@gmail.com', fullName: 'Hasan Abdukarimov', password: '12345' }).save();
        await UserEntity.create({ email: 'demo4@gmail.com', fullName: 'Hilola Nasimova', password: '12345' }).save();

        console.log('Database: Seed data loaded!');
    }
};
