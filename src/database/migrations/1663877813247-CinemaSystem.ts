import { 
  MigrationInterface, 
  QueryRunner, 
  Table,
  TableForeignKey, 
} from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'image_url', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'locations',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'location', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'slots',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'slot_number', type: 'varchar' },
          { name: 'start_time', type: 'varchar' },
          { name: 'end_time', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'payment_plans',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'plan', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'seat_types',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'seat_type', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'films',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'status', type: 'integer', isNullable: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'ongoing_shows',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'filmId', type: 'integer', isNullable: false },
          { name: 'slotId', type: 'integer', isNullable: false },
          { name: 'locationId', type: 'integer', isNullable: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ongoing_shows',
      new TableForeignKey({
        columnNames: ['filmId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'films'
      }),
    );

    await queryRunner.createForeignKey(
      'ongoing_shows',
      new TableForeignKey({
        columnNames: ['slotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'slots'
      }),
    );

    await queryRunner.createForeignKey(
      'ongoing_shows',
      new TableForeignKey({
        columnNames: ['locationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locations'
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'seats',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'seat_number', type: 'integer', isNullable: false },
          { name: 'seatTypeId', type: 'integer', isNullable: false },
          { name: 'status', type: 'integer', isNullable: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'seats',
      new TableForeignKey({
        columnNames: ['seatTypeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seat_types'
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'film_seating_status',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'filmId', type: 'integer', isNullable: false },
          { name: 'slotId', type: 'integer', isNullable: false },
          { name: 'seatId', type: 'integer', isNullable: false },
          { name: 'status', type: 'varchar', isNullable: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'film_seating_status',
      new TableForeignKey({
        columnNames: ['filmId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'films'
      }),
    );

    await queryRunner.createForeignKey(
      'film_seating_status',
      new TableForeignKey({
        columnNames: ['slotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'slots'
      }),
    );

    await queryRunner.createForeignKey(
      'film_seating_status',
      new TableForeignKey({
        columnNames: ['seatId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seats'
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'userId', type: 'integer', isNullable: false },
          { name: 'filmId', type: 'integer', isNullable: false },
          { name: 'slotId', type: 'integer', isNullable: false },
          { name: 'seatId', type: 'integer', isNullable: false },
          { name: 'paymentId', type: 'integer', isNullable: false },
          { name: 'status', type: 'varchar', isNullable: false },
          { name: 'payment_mode', type: 'varchar', isNullable: true },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users'
      }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['paymentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'payment_plans'
      }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['filmId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'films'
      }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['slotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'slots'
      }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['seatId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seats'
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
