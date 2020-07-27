export default {
    methods: {
        handleBoardUnderUpdateData(board) {
            let name_ar, name_en, configurations, members;
            if (board.translations[0].language.code == 'ar') {
                name_ar = board.translations[0].name
                name_en = board.translations[1].name
            } else {
                name_en = board.translations[0].name
                name_ar = board.translations[1].name
            }

            configurations = board.accountconfiguration.reduce((a, b) => {
                a.push({
                    regulation_configuration_id: b.regulation_configuration_id,
                    name: b.regulationconfiguration[0].name.split("%s"),
                    status: b.status,
                    value1: b.value1,
                    value2: b.value2
                });
                return a;
            }, [])

            members = board.members.reduce((a, b) => {
                a.push({
                    member_id: b.member_id,
                    membership_id: b.membership_id,
                    position_id: b.position_id
                })
                return a
            }, [])

            let obj = {
                id: board.id,
                is_permanent: 0,
                name_ar: name_ar,
                name_en: name_en,
                start_at: board.start_at ? board.start_at.full : null,
                end_at: board.end_at ? board.end_at.full : null,
                configurations: configurations,
                managing_director_id: board.managing_director_id,
                secretary_id: board.secretary_id,
                members: members,
                authorities: null,
                membersCanViewCommittees: [],
                membersCanViewMeetings: [],
                membersCanViewActions: [],
                committeesAuthoritiesEnabled: false,
                meetingsAuthoritiesEnabled: false,
                actionsAuthoritiesEnabled: false,
                allCanViewCommittees: true,
                allCanViewMeetings: true,
                allCanViewActions: true,
            };

            obj.authorities = board.authorities.reduce((a, b) => {
                if (b.committee_ids == 'ALL') {
                    obj.committeesAuthoritiesEnabled = true
                    if (b.member_ids !== 'ALL') {
                        obj.membersCanViewCommittees = b.member_ids.split(",")
                        obj.allCanViewCommittees = false
                    }
                    a.push(
                        {
                            member_ids: b.member_ids,
                            committee_ids: "ALL"
                        }
                    )

                } else if (b.meeting_ids == 'ALL') {
                    obj.meetingsAuthoritiesEnabled = true
                    if (b.member_ids !== 'ALL') {
                        obj.membersCanViewMeetings = b.member_ids.split(",")
                        obj.allCanViewMeetings = false
                    }
                    a.push(
                        {
                            member_ids: b.member_ids,
                            meeting_ids: "ALL"
                        }
                    )
                } else {
                    obj.actionsAuthoritiesEnabled = true
                    if (b.member_ids !== 'ALL') {
                        obj.membersCanViewActions = b.member_ids.split(",")
                        obj.allCanViewActions = false
                    }
                    a.push(
                        {
                            member_ids: b.member_ids,
                            action_ids: "ALL"
                        }
                    )
                }
                return a
            }, [])

            this.$store.dispatch("STORE_SAVE", {
                moduleName: "boards_committees",
                key: "boardUnderUpdate",
                value: obj
            });
        },
        handleRequest(action, service, reqPayload) {
            return new Promise((resolve, reject) => {
                this.$store.dispatch('LOADING', true)
                this.$store
                    .dispatch(action, {
                        service: service,
                        reqPayload: reqPayload
                    })
                    .then(res => {
                        resolve(res)
                    })
                    .catch(messages => {
                        this.handleErrors(messages);
                        reject(false)
                    }).finally(() => {
                        this.$store.dispatch('LOADING', false)
                    })
            })
        },
        handleErrors(messages) {
            if (
                (messages !== null && messages !== false) &&
                (typeof messages === "object" &&
                    Array.isArray(messages) !== true)
            ) {
                Object.keys(messages).map(key => {
                    this.$toasted.error(this.$t(messages[key]));
                });
            } else if (
                messages !== null &&
                typeof messages === "object" &&
                Array.isArray(messages) === true
            ) {
                messages.map(message => {
                    this.$toasted.error(this.$t(message));
                })
            } else {
                this.$toasted.error(this.$t("Connection error please try again later"));
            }
        }
    }
}