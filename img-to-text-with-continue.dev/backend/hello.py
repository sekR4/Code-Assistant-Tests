def hello(name: str) -> str:
    """A simple demo function that returns a greeting message.

    Parameters
    ----------
    name : str
        The name of the person to greet.
    Returns
    -------
    str
        A greeting message addressed to the specified name.
    """


def main():
    print(hello("bob"))


if __name__ == "__main__":
    main()
