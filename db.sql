CREATE TABLE person (
p_id SERIAL PRIMARY KEY NOT NULL,
first_name VARCHAR(250),
last_name VARCHAR(250),
birth DATE
);

INSERT INTO person (
    first_name, 
    last_name, 
    birth) 
    VALUES (
        'Isaac',
        'Sanchez',
        '1991-02-18'
    );

    INSERT INTO person (
    first_name, 
    last_name, 
    birth) 
    VALUES (
        'Jon',
        'Stutz',
        '1991-02-18'
    );


    INSERT INTO person (
    first_name, 
    last_name, 
    birth) 
    VALUES (
        'Domenick',
        'Casper',
        '1991-02-18'
    );

       INSERT INTO person (
    first_name, 
    last_name, 
    birth) 
    VALUES (
        'Ryan',
        'Blomquist',
        '1991-02-18'
    );

        INSERT INTO person (
    first_name, 
    last_name, 
    birth) 
    VALUES (
        'Isaac',
        'Sanchez',
        '1991-02-18'
    );


    CREATE USER isaac WITH PASSWORD 'student';
    GRANT SELECT,INSERT, UPDATE ON person TO isaac;
    GRANT USAGE, SELECT ON SEQUENCE person_p_id_seq TO isaac;