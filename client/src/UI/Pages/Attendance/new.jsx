<Tbody>
  {/* Filter unique names from leavedata */}
  {Array.from(new Set(leavedata?.map((e) => e?.user?.firstname))).map(
    (name, index) => {
      const userData = leavedata.filter(
        (e) => e?.user?.firstname === name
      );

      // Calculate total and remaining paid leaves
      let totalPaidLeaves = 0;

      userData.forEach((e) => {
        if (e?.leavetype === "paid-leave" && e?.status === "Approve") {
          totalPaidLeaves += 1;
        }
      });

      const remainingPaidLeaves = 12 - totalPaidLeaves;

      return (
        <Tr key={index}>
          <Td>{index + 1}</Td>
          <Td className="capitalize">
            {userData[0]?.user?.firstname} {userData[0]?.user?.lastname}
          </Td>
          <Td>12</Td>
          <Td>{totalPaidLeaves}</Td>
          <Td>{remainingPaidLeaves}</Td>
        </Tr>
      );
    }
  )}
</Tbody>
