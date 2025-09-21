export class GlobalConstants {
    public static LANGUAGE = "LANGUAGE";
    public static LANGUAGE_VI = "vi";
    public static LANGUAGE_EN = "en";
    public static FOR_ALL = "FOR_ALL";
    public static PRIVATE_USE = "PRIVATE_USE";
    public static USED_MANY_TIMES = "USED_MANY_TIMES";

	public static GIFTCODE_TYPE = [
		{"name" : "Giftcode chung", "value" : GlobalConstants.FOR_ALL},
		{"name" : "Giftcode riêng","value" : GlobalConstants.PRIVATE_USE},
		{"name" : "Giftcode dùng nhiều lần","value" : GlobalConstants.USED_MANY_TIMES},
	];
}