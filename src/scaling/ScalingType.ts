export enum ScalingType {
    RAW = 'R', // base + (0.00 * Level) scaling
    LOW = 'E', // base + ()
    MEDIUM_LOW = 'D',
    MEDIUM = 'C',
    MEDIUM_HIGH = 'B',
    HIGH = 'A',
    SUPREME = 'S'
}

export enum ScalingConstants {
    R = 0,
    E = 1.0,
    D = 1.5,
    C = 2.25,
    B = 3.25,
    A = 4.50,
    S = 6.00,
}